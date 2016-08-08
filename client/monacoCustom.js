//---------------------------------------------------
// Extending Language Services > Completion provider example
//---------------------------------------------------

function createDependencyProposals() {
    // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
    // here you could do a server side lookup
    return [
        {
            label: '"lodash"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "The Lodash library exported as Node.js modules.",
            insertText: '"lodash": "*"'
        },
        {
            label: '"express"',            
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "Fast, unopinionated, minimalist web framework",
            insertText: '"express": "*"'
        },
        {
            label: '"mkdirp"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Recursively mkdir, like <code>mkdir -p</code>",
            insertText: '"mkdirp": "*"'
        }
    ];
}

function createFooStuff() {
    // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
    // here you could do a server side lookup
    return [
        {
            label: '"test1"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Tdsgasgsd exported as Node.js modules.",
            insertText: '"lodash": "*"'
        },
        {
            label: '"test1"',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "Fastasdasdalistasdasdasdweb framework",
            insertText: '"express": "*"'            
        },
        {
            label: '"mkdirp"',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Recursively mkdir, like <code>mkdir -p</code>",
            insertText: '"mkdirp": "*"'
        }
    ];
}

function customizeEditor()
{
    monaco.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems: function(model, position) {
            // find out if we are completing a property in the 'dependencies' object.
            var textUntilPosition = model.getValueInRange({startLineNumber: 1, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column});
            var match = textUntilPosition.match(/"dependencies"\s*:\s*{\s*("[^"]*"\s*:\s*"[^"]*"\s*,\s*)*("[^"]*)?$/);        if (match) {
                return createDependencyProposals();
            }
            return [];
        }
    });

    monaco.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems: function(model, position) {
            // find out if we are completing a property in the 'dependencies' object.
            var textUntilPosition = model.getValueInRange({startLineNumber: 1, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column});
            var match = textUntilPosition.match(/"fooText"\s*:\s*{\s*("[^"]*"\s*:\s*"[^"]*"\s*,\s*)*("[^"]*)?$/);        if (match) {
                return createFooStuff();
            }
            return [];
        }
    });


    monaco.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems: () => {
            return [
                {
                    label: 'test1',
                    kind: monaco.languages.CompletionItemKind.Text
                }, {
                    label: 'test2',
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText:'testing({{condition}})'
                },
                {
                    label: 'test3',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: [
                        'if ({{condition}}) {',
                        '\t{{}}',
                        '} else {',
                        '\t',
                        '}'
                    ].join('\n'),
                    documentation: 'If-Else Statement'
                }
            ]
        }
    });
}