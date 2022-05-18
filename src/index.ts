import {readdir, readFile} from 'fs';
class genReport {
  docs: string;
  MOVER_MENTION_COUNT = 0;
  SHAKER_MENTION_COUNT = 0;
  SHORT_COMMENT_COUNT = 0;
  SPAM_COUNT = 0;
  QUESTIONS_COUNT = 0;
  URL_regex = new RegExp(
    '([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+'
  );
  metrics = {
    MOVER_MENTION: (line: String) =>
      /mover/.test(line.toLowerCase()) && 'MOVER MENTION',
    SHAKER_MENTION: (line: String) =>
      /shaker/.test(line.toLowerCase()) && 'SHAKER MENTION',
    SHORT_COMMENT: (line: String) => line.length < 15 && 'SHORTER THAN 15',
    SPAM: (line: String) =>
      this.URL_regex.test(line.toLowerCase()) && 'SPAM : URL DETECTED',
    QUESTIONS: (line: String) => line.toLowerCase().includes('?') && 'QUESTION',
  };
  constructor(d: string) {
    this.docs = d;
  }
  getReport() {
    readdir(this.docs, (err, files) => {
      if (err) {
        console.error(err.message);
        return;
      }
      files.forEach(file => {
        this.getComments(file);
      });
    });
  }

  private getComments(file: string) {
    readFile(`${this.docs}/${file}`, 'utf8', (err, comments) => {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log(comments);
      this.validate([...comments.split('\n')]);
    });
  }

  private validate(comments: String[]) {
    [comments].map(line => {
      line.map(mention => {
        Object.values(this.metrics).map(validate => {
          switch (validate(mention)) {
            case 'MOVER MENTION':
              this.MOVER_MENTION_COUNT += 1;
              break;
            case 'SHAKER MENTION':
              this.SHAKER_MENTION_COUNT += 1;
              break;
            case 'SHORTER THAN 15':
              this.SHORT_COMMENT_COUNT += 1;
              break;
            case 'SPAM : URL DETECTED':
              this.SPAM_COUNT += 1;
              break;
            case 'QUESTION':
              this.QUESTIONS_COUNT += 1;
              break;
            default:
              break;
          }
        });
      });
    });
    console.log(`\nTotal Mover Mentions : ${this.MOVER_MENTION_COUNT}`);
    console.log(`Total Shaker Mentions : ${this.SHAKER_MENTION_COUNT}`);
    console.log(
      `Total Mentions Shorther than 15 characters: ${this.SHORT_COMMENT_COUNT}`
    );
    console.log(`Total Spam Mentions : ${this.SPAM_COUNT}`);
    console.log(`Total Questions in Mentions : ${this.QUESTIONS_COUNT} \n`);
  }
}
const report = new genReport('./docs');
report.getReport();
