let questions = [];
let currentQuestionIndex = 0;
let finishedQuestion = 0;
let rightRate = 0;
document.getElementById('progress').innerText = finishedQuestion;
document.getElementById('accuracy').innerText = rightRate;
async/*异步函数*/ function loadQuestions() {
    try {
        const response = await fetch('questions.json');

        if (!response.ok) throw new Error('网络错误');

        questions = await response.json();
        loadQuestion(); // 加载第一题
    } catch (error) {
        console.error('加载题目失败:', error);
    }
    document.getElementById('total-questions').innerText = questions.length;
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];//加载当前题
    if (!question) return;//若不存在则返回

    document.getElementById('question-text').innerText = question.text;//加载题目文本

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';//为输入框元素设置空字符串 '' 以清空它

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');//创建节点
        optionElement.innerHTML = `
            <input type="radio" name="option" value="${index}" id="option${index}">
            <label for="option${index}">${option}</label>
        `;/*radio 类型的 <input> 元素通常用于一个单选组中，其中包含一组描述一系列相关选项的单选按钮。*/
        optionsDiv.appendChild(optionElement);
    });
    document.getElementById('total-questions').innerText = questions.length;
}


function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');//选中的选项
    if (!selectedOption){
        document.getElementById('result-text').innerText = '请选择一个选项';
        return;
    }

    finishedQuestion += 1;

    const answerIndex = parseInt(selectedOption.value);
    const question = questions[currentQuestionIndex];
    const resultText = answerIndex === question.answer ? '回答正确!' : '回答错误!';

    if(answerIndex === question.answer){
        rightRate += 1 / questions.length;
    }

    document.getElementById('result-text').innerText = resultText;
    document.getElementById('correct-answer').innerText = `正确答案：${question.options[question.answer]}`;
    document.getElementById('explanation').innerText = question.explanation;
    document.getElementById('progress').innerText = finishedQuestion;
    document.getElementById('accuracy').innerText = rightRate;
    document.getElementById('total-questions').innerText = questions.length;
}


document.getElementById('prev-botton').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
    document.getElementById('total-questions').innerText = questions.length;
});


document.getElementById('next-botton').addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
    document.getElementById('total-questions').innerText = questions.length;
});


document.getElementById('submit-botton').addEventListener('click', () => {
    checkAnswer();
    document.getElementById('total-questions').innerText = questions.length;
});


loadQuestions(); // 初始加载题目数据


