function udpateReadMeTodoCounter(tcounter) {
    const readmeFile = 'README.md'
    const currentTodoRegex = /current\stodo\scounter:\s(?<todocounter>\d+)/i

    fs.readFile(readmeFile, 'utf-8', function (err, data) {
        if (err) throw err

        const readMeTodoCounter = data.match(
            currentTodoRegex,
        )?.groups?.todocounter

        console.log(`Found todo count: ${tcounter}\nREADME.md todo count: ${readMeTodoCounter}`)

        // only update todo counter if current README.md todo DOES NOT match todos found
        if (~~readMeTodoCounter !== tcounter) {
            // find and replace todo counter in README file
            var newValue = data.replace(
                currentTodoRegex,
                `Current TODO counter: ${tcounter}`,
            )

            console.log(`Updating ${readmeFile} file with updated todo count of ${tcounter}`)
            fs.writeFile(readmeFile, newValue, 'utf-8', function (err, data) {
                if (err) throw err
                console.log('TODO counter updated!')
            })
        } else {
            console.log('No changes in TODO counter.')
        }
    })
}

function searchForTodos(results) {
    let TODOcounter = 0
    for (var result in results) {
        var res = results[result]
        console.log(`found "${res.matches[0]}" ${res.count} times in "${result}"`)

        TODOcounter += res.count
    }
    udpateReadMeTodoCounter(TODOcounter)
}

module.exports = udpateReadMeTodoCounter