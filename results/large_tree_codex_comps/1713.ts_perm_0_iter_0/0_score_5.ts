const isValid: (code: string) => boolean = function (code) {
    const STATES: { lt: number; tagOrData: number; tagName: number; dataContent: number; dataEnd: number; tagContent: number; } = {
        lt: 1,
        tagOrData: 2,
        tagName: 3,
        dataContent: 4,
        dataEnd: 5,
        tagContent: 6,
    };
    class Validator {
        state: any;
        str: string;
        stack: string[];
        i: number;
        isValid: boolean;
        constructor(str) {
            this.state = STATES.lt;
            this.str = str;
            this.stack = [];
            this.i = 0;
            // this ensure it doesnt start with cdata
            this.isValid = this.isUpperCase(this.str[1]);
            // check through code
            while (this.isValid && this.i < this.str.length) {
                this.isValid = this.validate();
            }
            // check if there is unclosed tags
            this.isValid = this.isValid && !this.stack.length;
        }
        validate(): boolean {
            let char: string = this.str[this.i];
            switch (this.state) {
                // expect '<', only used at start
                case STATES.lt:
                    this.i++;
                    if (char == "<") {
                        this.state = STATES.tagOrData;
                        return true;
                    }
                    return false;
                // expect (end-)tag-name or cdata
                case STATES.tagOrData:
                    // data
                    if (char == "!") {
                        this.i = this.findStrEnd(this.i + 1, "[CDATA[");
                        if (this.i == -1) {
                            return false;
                        }
                        this.state = STATES.dataContent;
                        return true;
                    }
                    // end tag
                    if (char == "/") {
                        let name: string = this.stack.pop();
                        if (!name) {
                            return false;
                        }
                        this.i = this.findStrEnd(this.i + 1, name + ">");
                        if (this.i == -1) {
                            return false;
                        }
                        if (!this.stack.length && this.i < this.str.length) {
                            // more than one top level tags
                            return false;
                        }
                        this.state = STATES.tagContent;
                        return true;
                    }
                    // tag name
                    {
                        let name: string = this.findTagName(this.i);
                        if (!name) {
                            return false;
                        }
                        if (name.length > 9) {
                            return false;
                        }
                        this.i += name.length + 1;
                        this.stack.push(name);
                        this.state = STATES.tagContent;
                        return true;
                    }
                case STATES.dataContent: {
                    // you can try replace these code with indexOf
                    let end: number = this.findStrEnd(this.i, "]]>");
                    if (end != -1) {
                        // found end
                        this.i = end;
                        this.state = STATES.tagContent;
                        return true;
                    }
                    // not yet
                    this.i++;
                    return true;
                }
                case STATES.tagContent:
                    if (char == "<") {
                        this.state = STATES.tagOrData;
                        this.i++;
                        return true;
                    }
                    this.i++;
                    return true;
            }
        }
        isUpperCase(char: string): boolean {
            return /[A-Z]/.test(char);
        }
        findStrEnd(from: number, toFind?: string): number {
            let end: number = from + toFind.length;
            for (let i: number = 0; i < toFind.length; i++) {
                if (toFind[i] != this.str[i + from])
                    return -1;
            }
            return end;
        }
        findTagName(from: number): string {
            let tagName: string = "";
            for (let i: number = from; i < this.str.length; i++) {
                if (this.isUpperCase(this.str[i])) {
                    tagName += this.str[i];
                    continue;
                }
                if (this.str[i] == ">") {
                    return tagName;
                }
                return "";
            }
            return "";
        }
    }
    let v: Validator = new Validator(code);
    return v.isValid;
};
