var Questions = [
	{
		question: "Quel est l'objet le plus haut niveau en Javascript",
		options: ["top", "window", "document", "url"],
		correct: 1,
	},
	{
		question: "Quel est l'événement inverse de onFocus ?",
		options: ["onFocusDown", "onFocusOff", "", "OnDeselect"],
		correct: 2,
	},
	{
		question:
			"En JavaScript, quelle propriété permet de modifier l’ élément HTML (p)bonjour(/p) ?",
		options: [
			`document.getElementsByTagName("p").innerHTML`,
			`document.getElementsByName("p").innerHTML`,
			`document.getElementsByTagName("p").content`,
			`document.getElementById("p").content`,
		],
		correct: 0,
	},
	{
		question:
			"Lequel des éléments suivants n’est pas une propriété (un objet fils) de l’objet window?",
		options: ["document", "menu", "navigator", "history"],
		correct: 1,
	},
	{
		question:
			"Pour ajouter un attribut déjà supprimé à un élément on utilise ?",
		options: [
			`document.getElementById("t1"). setAttribut(“name”,” monattr”);`,
			`document.createAttrNode("name");`,
			`document.getElementById("t1").name= “monattr”`,
			`document.getElementById("t1").attr= “monattr”`,
		],
		correct: 0,
	},
	{
		question: `La boite de diaglogue confirm() est méthode de l’objet ?`,
		options: [`Window`, `Document`, `Browser`, `Dialogue`],
		correct: 0,
	},
];

const listOfQuestions = document.getElementById("listOfQuestions");
const showQuestions = () => {
	GeneratedQuestions = Questions.map(generateQustion);
	// console.log(GeneratedQuestions);
	listOfQuestions.innerHTML = GeneratedQuestions.join("");
};

const generateQustion = (params, questIndex) => {
	let options = params["options"].map((value, index, array) => {
		return `<li class="choice">
                        <label class=container>
                            <input type="radio" name="quest_${questIndex}" id="" value="${index}">
                            <span class="checkmark"></span>
                            ${value}
                        </label>
                    </li>
                    `;
	});
	return `<li class="question">
        <div class="actual-question">
        ${params["question"]}
        </div>
        <div id="answer"></div>
        <div class="choices">
            <ul>
                ${options.join("")}
            </ul>
        </div>
    </li>`;
};

const form = document.getElementById("test");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	// let localform = new FormData("test");
	// console.log(localform.getAll());

	let values = Questions.map(
		(quest, currentIndex) => form.elements[`quest_${currentIndex}`].value,
	);
	let empty = values.map((value) => !value);
	if (empty.findIndex((v) => v) !== -1) {
		empty.map((value, index, array) => {
			if (!value) {
				listOfQuestions["children"][index]["children"][1].className = "";
				return;
			}
			listOfQuestions["children"][index]["children"][1].className = "red";
		});
		alert("toutes les questions sont obligatoires ");
		return;
	}
	let correct = Questions.map(
		(quest, currentIndex) =>
			parseInt(form.elements[`quest_${currentIndex}`].value) == quest.correct,
	);

	let score = correct.reduce(
		(previousValue, currentValue) => currentValue + previousValue,
		0,
	);

	correct.map((value, index) => {
		if (value) {
			listOfQuestions["children"][index]["children"][1].className = "green";
		} else {
			listOfQuestions["children"][index]["children"][1].className = "red";
		}
	});

	alert("votre score est : " + score);
});
