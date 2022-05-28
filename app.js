// Liste de compte sous forme d'objets dans un array
compte = {
    numero: 1,
    nom: "JC Monnet",
    solde: 2500,
};

// Actualisation du nom et du solde sur la page HTML dès le chargement de la page
actualiserCompte();

function actualiserCompte() {
    let titulaire = document.querySelector('#account-name');
    titulaire.textContent = compte.nom
    let soldeCompte = document.querySelector('.solde-amount');
    // alt gr +7, $ et £ pour afficher euros après solde
    soldeCompte.textContent = `${compte.solde} €`;
};

let boutonDepot = document.querySelector('#btn-depot');
boutonDepot.addEventListener('click', faireDepot);
function faireDepot(event) {
    // Empêcher la validation du formulaire d'actualiser la page
    event.preventDefault();
    let inputDepot = document.querySelector('#inputDepot');
    let messageValidation=document.querySelector('.alert-depot');
    // Transformation de la valeur de l'input en nombre grâce à parseInt()
    let montantDepot = parseInt(inputDepot.value);
    // pour éviter l'enregistrement des depôts de 0 ou négatif
    if (montantDepot<= 0){
    messageValidation.textContent="désolé ce montant n'est pas valide";
    messageValidation.classList.add('negative');
}
// pour éviter validation champs vide
else if (inputDepot.value==""){
    messageValidation.textContent="désolé vous devez saisir un montant";
    messageValidation.classList.add('negative'); 
}

 else  {
    compte.solde = compte.solde + montantDepot;
    messageValidation.textContent="votre depôt a bien été enregistré";
    messageValidation.classList.add('positive');
    insererHistorique("depot", montantDepot);
}
actualiserCompte();
    // On remet la value de l'input vide pour réinitialiser le champ
    inputDepot.value = "";
    
};

// cette fois avec fonction flechée
let boutonRetrait = document.querySelector('#btn-retrait');
boutonRetrait.addEventListener('click', faireRetrait => {
faireRetrait.preventDefault();
// Récupération de la valeur de l'input du formulaire
let inputRetrait=document.querySelector('#inputRetrait');
// Transformation de la valeur de l'input en nombre grâce à parseInt()
let montantRetrait=parseInt(inputRetrait.value);
// Récupération de l'endroit où placer le message d'erreur/validation
let message=document.querySelector('.alert-retrait');
// Si la valeur du retrait est plus grande que le solde actuel
// Message d'erreur négatif
// Ajout de la classe negative pour mettre le texte en rouge
if (montantRetrait>compte.solde) {
    message.textContent=" désolé, solde insuffisant";
    message.classList.add("negative");
}
// pour éviter les retraits de 0 ou négatif
 else if(montantRetrait<=0){
    message.textContent=" désolé, ce montant n'est pas valide";
    message.classList.add("negative");
}
else if (inputRetrait.value==""){
    message.textContent="désolé vous devez saisir un montant";
    message.classList.add('negative') }
// Sinon on effectue le retrait
else {
    compte.solde= compte.solde - montantRetrait
    message.textContent=" votre retrait a bien été enregistré";
    message.classList.add("positive");
    insererHistorique("retrait", montantRetrait);
};
actualiserCompte();
// On remet la value de l'input vide pour réinitialiser le champ
inputRetrait.value="";
});

// Insertion de l'opération dans l'historique en fonction du type d'opération reçue
function insererHistorique(type, value) {
    // Définition de la variable template vide pour la récupérer hors des conditions
    let template;
    // Si le type d'opération est un depot
    if (type === "depot") {
        // Récupération du template dans le HTML via un query selector
        template = document.querySelector("#depot");
    }
    // Si le type d'opération est un retrait
    else if (type === "retrait") {
        // Récupération du template dans le HTML via un query selector
        template = document.querySelector("#retrait");
    }
    // Importation du clone dans le DOM avec le contenu du template sans qu'il n'apparaisse nulle part pour le moment
    let clone = document.importNode(template.content, true);
    // Modification du clone avec les informations qu'on veut lui donner
    clone.querySelector(".date").textContent = new Date().toDateString();
    clone.querySelector(".value").textContent = value + " €";

    // Récupération de la div parente où importer le clone
    let historiqueListe = document.querySelector(".historique-list");
    // Importation du clone enfant dans la div parente
    historiqueListe.appendChild(clone);
}
