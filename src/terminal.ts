export class AppTerminal {
    private outputContainer: HTMLElement;
    private typingText: HTMLElement;
    private commandInputLine: HTMLElement;

    // Available commands
    private commands: Record<string, string> = {
        'help': 'Available commands: about, projects, contact, skills, clear',
        'about': 'Hi, I am Nandan Kumar (Matrix Edition).\\nI am a Web Developer specializing in React, TypeScript, and Sci-Fi UIs.',
        'skills': 'Languages: TypeScript, JavaScript, Python, HTML/CSS\\nFrameworks: React, Node.js, Express, Vite\\nTools: Git, Docker, Linux',
        'projects': `<div class="output-block">
      <div class="output-title">> Bank Churn Prediction</div>
      <div>Machine learning project predicting bank customer churn.</div>
      <a href="#" class="terminal-link">[View Project]</a>
    </div>
    <div class="output-block">
      <div class="output-title">> Breast Cancer Detection</div>
      <div>AI project for early breast cancer classification.</div>
      <a href="#" class="terminal-link">[View Project]</a>
    </div>
    <div class="output-block">
      <div class="output-title">> Matrix Portfolio</div>
      <div>Personal portfolio with Matrix code rain and sci-fi design.</div>
      <a href="#" class="terminal-link">[View Source]</a>
    </div>`,
        'contact': 'Email: <a href="mailto:hello@example.com" class="terminal-link">hello@example.com</a>\\nGitHub: <a href="https://github.com" target="_blank" class="terminal-link">github.com/example</a>\\nLinkedIn: <a href="https://linkedin.com" target="_blank" class="terminal-link">linkedin.com/in/example</a>'
    };

    constructor() {
        this.outputContainer = document.getElementById('terminal-output')!;
        this.typingText = document.getElementById('typing-text')!;
        this.commandInputLine = document.getElementById('command-line')!;
    }

    public async bootSequence() {
        this.commandInputLine.style.display = 'none';
        await this.typeText('Initializing Matrix protocol...', 30);
        this.printToTerminal('System check OK.');
        await this.typeText('Establishing secure connection...', 30);
        this.printToTerminal('Connection established.');
        this.printToTerminal('Wake up, Neo...\\n');
        await new Promise(r => setTimeout(r, 500));

        this.printToTerminal('Type <span style="color:#fff">help</span> to see available commands.');
        this.setupInteractiveInput();
    }

    private async typeText(text: string, speed: number = 30): Promise<void> {
        const tempLine = document.createElement('div');
        tempLine.className = 'terminal-line glow';
        this.outputContainer.appendChild(tempLine);

        for (let i = 0; i < text.length; i++) {
            tempLine.innerHTML += text.charAt(i);
            await new Promise(r => setTimeout(r, speed));
        }
        return Promise.resolve();
    }

    private printToTerminal(htmlContent: string) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = htmlContent;
        this.outputContainer.appendChild(line);
        this.scrollToBottom();
    }

    private setupInteractiveInput() {
        this.commandInputLine.style.display = 'flex';
        this.typingText.style.display = 'none';

        // Create an actual input element but hide it visually, or style it to look like text
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'interactive-input glow';
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('spellcheck', 'false');
        input.setAttribute('autofocus', 'true');

        this.commandInputLine.insertBefore(input, this.commandInputLine.querySelector('.blinking-cursor'));

        // Keep focus on input
        document.addEventListener('click', () => {
            input.focus();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = input.value.trim().toLowerCase();

                // Print the command that was typed
                this.printToTerminal(`<span id="prompt">user@matrix:~$</span> <span class="glow">${input.value}</span>`);

                // Process
                if (cmd) {
                    this.processCommand(cmd);
                }

                input.value = '';
                this.scrollToBottom();
            }
        });
    }

    private processCommand(cmd: string) {
        if (cmd === 'clear') {
            this.outputContainer.innerHTML = '';
            return;
        }

        const response = this.commands[cmd];
        if (response) {
            this.printToTerminal(response);
        } else {
            this.printToTerminal(`matrix: command not found: ${cmd}. Type <span style="color:#fff">help</span> for a list of commands.`);
        }
    }

    private scrollToBottom() {
        window.scrollTo(0, document.body.scrollHeight);
    }
}
