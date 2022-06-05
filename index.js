// Liste de compte sous forme d'objets dans un tableau
let comptes = [
    {
        numero: 1,
        nom: "JC Monnet",
        solde: 2500,
    },
    {
        numero: 2,
        nom: "Melanie Monnet",
        solde: 2500,
    },
    {
        numero: 3,
        nom: "Clemence Monnet",
        solde: 250,
    },
    {
        numero: 4,
        nom: "Lola Monnet",
        solde: 250,
    },
];


// Fonction de connexion
function connection() {
    // Récupération de l'input du formulaire
    inputValueAccount = document.querySelector("#inputAccount").value;
    // Appel de la fonction pour determiner true/false si le compte existe
    accountExists = checkAccountExists(inputValueAccount);
    // Si le compte n'existe pas
    if (!accountExists) {
        // Selection de l'endroit où mettre le message d'erreur
        alertAccount = document.querySelector(".alert-account");
        // Message d'erreur négatif
        alertAccount.textContent = "Ce compte n'existe pas";
        // Ajout de la classe negative pour mettre le texte en rouge
        alertAccount.classList.add("negative");
    }
    // Si le compte existe
    else {
        // Redirection vers la page account.html en insérant le parametre ?account= + valeur de l'input pour pouvoir passer l'info du compte à utiliser lors de la page suivante
        document.location.href = "./account.html?account=" + inputValueAccount;
    }
}

// Fonction pour determiner true/false si le compte existe
function checkAccountExists(accountNumber) {
    // Boucle pour parcourir la liste des comptes
    for (const compte of comptes) {
        // Si un compte correspond à notre numéro de compte rentré dans l'input
        if (compte["numero"] == accountNumber) {
            // On retourne true
            return true;
        }
    }
    // Si à la fin de la boucle on a rien trouvé on retourne false
    return false;
}

