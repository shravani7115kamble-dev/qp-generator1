// QuestionPaperGenerator.js

class QuestionPaperGenerator {
    constructor(modules, criteria) {
        this.modules = modules;
        this.criteria = criteria;
    }
  
    generateQuestionPaper() {
        const questionPaper = {};
        const questions = this.generateQuestions();
        questionPaper.questions = questions;
        return questionPaper;
    }
  
    generateQuestions() {
        const questions = [];
        // Q1: 10 marks with 6 sub-questions
        questions.push(this.generateQ1());
        // Q2: 5 marks
        questions.push(this.generateQ2());
        // Q3: 5 marks
        questions.push(this.generateQ3());
        return questions;
    }
  
    generateQ1() {
        const q1 = {
            question: "Q1: Choose the following questions (Total 10 marks)",
            subQuestions: this.randomSubQuestions(6)
        };
        return q1;
    }
  
    generateQ2() {
        return { question: "Q2: Specific question (5 marks)" };
    }
  
    generateQ3() {
        return { question: "Q3: Specific question (5 marks)" };
    }
  
    randomSubQuestions(count) {
        // Logic to randomly pick sub-questions from modules
        let subQuestions = [];
        const totalAvailable = this.modules.reduce((total, module) => total + module.questions.length, 0);
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * totalAvailable);
            let cumulative = 0;
            for (let j = 0; j < this.modules.length; j++) {
                cumulative += this.modules[j].questions.length;
                if (randomIndex < cumulative) {
                    const selectedQuestion = this.modules[j].questions[randomIndex - (cumulative - this.modules[j].questions.length)];
                    subQuestions.push(selectedQuestion);
                    break;
                }
            }
        }
        return subQuestions;
    }
}

// Example usage:
const modules = [
    { name: "Module 1", questions: ["Q1-1", "Q1-2", "Q1-3"] },
    { name: "Module 2", questions: ["Q2-1", "Q2-2", "Q2-3"] },
    { name: "Module 3", questions: ["Q3-1", "Q3-2", "Q3-3"] },
];
const criteria = { q1: { marks: 10, subQuestions: 6 }, q2: { marks: 5 }, q3: { marks: 5 } };
const generator = new QuestionPaperGenerator(modules, criteria);
const questionPaper = generator.generateQuestionPaper();
console.log(questionPaper);