"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class genReport {
    constructor(d) {
        this.MOVER_MENTION_COUNT = 0;
        this.SHAKER_MENTION_COUNT = 0;
        this.SHORT_COMMENT_COUNT = 0;
        this.SPAM_COUNT = 0;
        this.QUESTIONS_COUNT = 0;
        this.URL_regex = new RegExp('([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+');
        this.metrics = {
            MOVER_MENTION: (line) => /mover/.test(line.toLowerCase()) && (this.MOVER_MENTION_COUNT += 1),
            SHAKER_MENTION: (line) => /shaker/.test(line.toLowerCase()) && (this.SHAKER_MENTION_COUNT += 1),
            SHORT_COMMENT: (line) => line.length < 15 && (this.SHORT_COMMENT_COUNT += 1),
            SPAM: (line) => this.URL_regex.test(line.toLowerCase()) && (this.SPAM_COUNT += 1),
            QUESTIONS: (line) => line.toLowerCase().includes('?') && (this.QUESTIONS_COUNT += 1),
        };
        this.docs = d;
    }
    getReport() {
        (0, fs_1.readdir)(this.docs, (err, files) => {
            if (err) {
                console.error(err.message);
                return;
            }
            files.forEach(file => {
                this.getComments(file);
            });
        });
    }
    getComments(file) {
        (0, fs_1.readFile)(`${this.docs}/${file}`, 'utf8', (err, comments) => {
            if (err) {
                console.error(err.message);
                return;
            }
            console.log(comments);
            this.validate([...comments.split('\n')]);
        });
    }
    validate(comments) {
        [comments].map(line => {
            line.map(mention => {
                Object.values(this.metrics).map(validate => {
                    validate(mention);
                });
            });
        });
        const report = {
            'Total Mover Mentions': this.MOVER_MENTION_COUNT,
            'Total Shaker Mentions': this.SHAKER_MENTION_COUNT,
            'Total Mentions Shorther than 15 characters': this.SHORT_COMMENT_COUNT,
            'Total Spam Mentions': this.SPAM_COUNT,
            'Total Questions in Mentions': this.QUESTIONS_COUNT,
        };
        console.log(report);
    }
}
const report = new genReport('./docs');
report.getReport();
//# sourceMappingURL=index.js.map