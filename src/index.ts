type OrgNode = {
    level: number
    title: string
    status?: 'TODO' | 'DONE' |  'KILL' | 'PROJ' |  'LOOP' | 'STRT' |  'WAIT' | 'HOLD' |  'IDEA'
    deadline?: string
    scheduled?: string
    content?: string[]
    children?: OrgNode[]
}

type OrgFile = {
    properties: { [key: string]: string}
    nodes: OrgNode[]
}

export function parseOrg(text: string): OrgFile {
    const lines = text.split("\n")

    const properties: Record<string, string> = {}
    const nodes: OrgNode[] = []
    const stack: OrgNode[] = []

    let currentNode: OrgNode | null = null;
    let parsingHeadingStarted = false

    for (const line of lines) {

        const propMatch = line.match(/^#\+([A-Za-z_]+):\s*(.+)$/)
        if(!parsingHeadingStarted && propMatch) {
            const [, key, value] = propMatch
            properties[key.toLowerCase()] = value
            continue
        }

        const headingMatch = line.match(/^(\*+)\s+(TODO|DONE|KILL|PROJ|LOOP|STRT|WAIT|HOLD|IDEA)?\s*(.+)?$/)

        if (headingMatch) {
            parsingHeadingStarted = true
            const [, stars, status, rest] = headingMatch
            const level = stars.length
            const title = rest.trim() || '';

            const node: OrgNode = {
                level,
                title,
                status: status as 'TODO' | 'DONE' |  'KILL' | 'PROJ' |  'LOOP' | 'STRT' |  'WAIT' | 'HOLD' |  'IDEA',
                content: [],
                children: []
            };

            // Insert node into correct place in tree
            while (stack.length > 0 && stack[stack.length - 1].level >= level) {
                stack.pop();
            }
            
            if (stack.length === 0) {
                nodes.push(node);
            } else {
                stack[stack.length - 1].children?.push(node);
            }
            
            stack.push(node);
            currentNode = node;
  
        } else if (currentNode) {
            const scheduleMatch = line.match(/(DEADLINE|SCHEDULED):\s*<([^>]+)>/g)
            if (scheduleMatch) {
                for (const entry of scheduleMatch) {
                    const [, key, value] = entry.match(/(DEADLINE|SCHEDULED):\s*<([^>]+)>/)!
                    if (key === "DEADLINE") {
                        currentNode.deadline = value
                    } else if (key === "SCHEDULED") {
                        currentNode.scheduled = value
                    }
                }
            } else {
                const content = line.trim()
                if(content) {
                    currentNode.content?.push(content)
                }
            }
        }
    }

    return { properties, nodes }
}