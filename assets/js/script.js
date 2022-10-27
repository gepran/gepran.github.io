checkUserSession();

//selecting all required elements
const home_page = document.querySelector(".home_page");
const info_box = document.querySelector(".info_box");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const scoreCounter = document.querySelector(".score .score_counter");

let h_questions = [];
let g_questions = [];
let c_questions = [];

let selected_questions = [];


function shuffleQuestions(){
    h_questions = shuffle(HISTORY_QUESTIONS);
    g_questions = shuffle(GRAMMAR_QUESTIONS);
    c_questions = shuffle(CONSTITUTION_QUESTIONS);
}

function goToHomePage(){
    home_page.classList.remove("d-none"); //hide start button
    quiz_box.classList.add("d-none"); //hide info box
    result_box.classList.add("d-none"); //hide info box
}

function startTests(question_qty, subject){
    home_page.classList.add("d-none"); //hide start button
    quiz_box.querySelector(".card-title").innerText = setQuizTitle(subject);
    quiz_box.classList.remove("d-none"); //show quiz box
    selected_questions = pickQuestionsList(question_qty, subject);
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    scoreCalculator(); //calling Score function
}

function setQuizTitle(subject){
    if(subject === 'HISTORY'){
        return "Истории";
    } else if (subject === 'GRAMMAR'){
        return "Грамматика";
    } else if (subject === 'CONSTITUTON'){
        return "Конституция";
    } else if (subject === 'MIXED'){
        return "Смешанные Вопросы";
    }
}

function pickQuestionsList(question_qty, subject){
    shuffleQuestions();
    
    if(subject === 'HISTORY'){
        return h_questions.slice(0, question_qty);
    } else if (subject === 'GRAMMAR'){
        return g_questions.slice(0, question_qty);
    } else if (subject === 'CONSTITUTON'){
        return c_questions.slice(0, question_qty);
    } else if (subject === 'MIXED'){
        let h_q = h_questions.slice(0, 10);
        let g_q = g_questions.slice(0, 10);
        let c_q = c_questions.slice(0, 10);
        let mixed_questions = [...h_q, ...g_q, ...c_q];

        return shuffle(mixed_questions);
    }
}

let que_count = 0;
let que_numb = 1;
let userScore = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.remove("d-none"); //show quiz box
    result_box.classList.add("d-none"); //hide result box
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    scoreCalculator(); //calling score function
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
function goToNextQuestion(){
    if(que_count < selected_questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        scoreCalculator(); //calling score function
        next_btn.classList.remove("show"); //hide the next button
    }else{
        showResult(); //calling showResult function
    }
}

// getting selected_questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");
    const rus_que_text = document.querySelector(".rus_que_text");
    
    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ selected_questions[index].numb + ". " + selected_questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ selected_questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ selected_questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ selected_questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ selected_questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    rus_que_text.innerHTML = selected_questions[index].question_rus; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick text-center"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross text-center"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    let userAns = answer.textContent; //getting user selected option
    let correcAns = selected_questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    quiz_box.classList.add("d-none"); //hide quiz box
    result_box.classList.remove("d-none"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // if user scored more than 3
        let scoreTag = `<p class="mb-0">Вы пытаетесь ответить на <span class="text-primary fw-bolder">${selected_questions.length} вопросов</span></p>
        <p>и из них <span class="text-success fw-bolder">${userScore} ответов</span> верны.</p>`;
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = `<p class="mb-0">Вы пытаетесь ответить на <span class="text-primary fw-bolder">${selected_questions.length} вопросов</span></p>
        <p>и из них <span class="text-success fw-bolder">${userScore} ответов</span> верны.</p>`;
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = `<p class="mb-0">Вы пытаетесь ответить на <span class="text-primary fw-bolder">${selected_questions.length} вопросов</span></p>
        <p>и из них <span class="text-success fw-bolder">${userScore} ответов</span> верны.</p>`;
        scoreText.innerHTML = scoreTag;
    }
}

function scoreCalculator(time){
    scoreCounter.innerHTML = userScore +' из '+ selected_questions.length;
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span>'+ index +' из '+ selected_questions.length +' Вопросов</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

function checkUserSession(){
    //Is the user authenticated?
    if (sessionStorage.getItem('AuthenticationState') === null) {
        window.open("login.html", "_self");
    }
    //Is their authentication token still valid?
    else if (new Date() > new Date(sessionStorage.getItem('AuthenticationExpires'))) {
        window.open("login.html", "_self");
    }
    else {
        
    }
}

function logoutFromSystem(){
    sessionStorage.removeItem("AuthenticationState");
    sessionStorage.removeItem("AuthenticationExpires");
    window.open("login.html", "_self");
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}