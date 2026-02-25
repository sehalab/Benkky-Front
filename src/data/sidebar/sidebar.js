// /src/data/sidebar/sidebar.js
export const MenuList = [
    // ========== TABLEAU DE BORD ==========
    {
        type: "dropdown",
        title: "Tableau de bord",
        iconClass: "home",
        name: "dashboard",
        badgeCount: "3",
        collapseId: "dashboard",
        path: "/dashboard",
        // children: [
        //     { name: "Vue d'ensemble", path: "/dashboard/overview" },
        //     { name: "Activité récente", path: "/dashboard/activity" },
        //     { name: "Statistiques", path: "/dashboard/statistics" },
        // ],
    },

    // ========== SERVICES FINANCIERS ==========
    {
        type: "dropdown",
        title: "Services financiers",
        iconClass: "briefcase",
        name: "services",
        collapseId: "services",
        path: "/services",
        children: [
            { name: "Tous les services", path: "/services/tous" },
            {
                name: "Cartes Virtuelles",
                path: "/services/cartes",
                collapseId: "cartes",
                iconClass: "cc-mastercard",
                children: [
                    { name: "Mes cartes", path: "/services/cartes/mes-cartes" },
                    { name: "Créer une carte", path: "/services/cartes/creer" },
                    { name: "Geler/Dégeler", path: "/services/cartes/gerer" },
                    { name: "Historique", path: "/services/cartes/historique" },
                ],
            },
            {
                name: "eSIMs",
                path: "/services/esims",
                collapseId: "esims",
                iconClass: "sim-card",
                children: [
                    { name: "Mes eSIMs", path: "/services/esims/mes-esims" },
                    { name: "Acheter forfait", path: "/services/esims/acheter" },
                    { name: "Recharger", path: "/services/esims/recharger" },
                    { name: "Couverture réseau", path: "/services/esims/couverture" },
                ],
            },
            {
                name: "Transferts d'argent",
                path: "/services/transferts",
                collapseId: "transferts",
                iconClass: "arrow-right-arrow-left",
                children: [
                    { name: "Nouveau transfert", path: "/services/transferts/nouveau" },
                    { name: "Transferts internationaux", path: "/services/transferts/internationaux" },
                    { name: "Transferts locaux", path: "/services/transferts/locaux" },
                    { name: "Bénéficiaires", path: "/services/transferts/beneficiaires" },
                    { name: "Taux de change", path: "/services/transferts/taux" },
                ],
            },
            {
                name: "Dépôts & Retraits",
                path: "/services/depots",
                collapseId: "depots",
                iconClass: "wallet",
                children: [
                    { name: "Dépôt par carte", path: "/services/depots/carte" },
                    { name: "Dépôt par virement", path: "/services/depots/virement" },
                    { name: "Retrait bancaire", path: "/services/depots/retrait-bancaire" },
                    { name: "Retrait mobile money", path: "/services/depots/mobile-money" },
                ],
            },
            {
                name: "Crypto-monnaies",
                path: "/services/crypto",
                collapseId: "crypto",
                iconClass: "bitcoin",
                children: [
                    { name: "Portefeuille", path: "/services/crypto/portefeuille" },
                    { name: "Acheter crypto", path: "/services/crypto/acheter" },
                    { name: "Vendre crypto", path: "/services/crypto/vendre" },
                    { name: "Échanger", path: "/services/crypto/echanger" },
                    { name: "Marchés", path: "/services/crypto/marches" },
                ],
            },
        ],
    },

    // ========== GESTION DU COMPTE ==========
    {
        type: "dropdown",
        title: "Mon compte",
        iconClass: "user",
        name: "compte",
        collapseId: "compte",
        path: "/compte",
        children: [
            { name: "Profil", path: "/compte/profil" },
            {
                name: "Vérification KYC",
                path: "/compte/kyc",
                collapseId: "kyc",
                iconClass: "shield-check",
                badgeCount: "1",
                children: [
                    { name: "Statut KYC", path: "/compte/kyc/statut" },
                    { name: "Documents d'identité", path: "/compte/kyc/documents" },
                    { name: "Justificatif domicile", path: "/compte/kyc/domicile" },
                    { name: "Vérification biométrique", path: "/compte/kyc/biometrie" },
                ],
            },
            {
                name: "Transactions",
                path: "/compte/transactions",
                collapseId: "transactions",
                iconClass: "receipt",
                children: [
                    { name: "Toutes", path: "/compte/transactions/toutes" },
                    { name: "Reçus", path: "/compte/transactions/recus" },
                    { name: "Envoyés", path: "/compte/transactions/envoyes" },
                    { name: "En attente", path: "/compte/transactions/attente" },
                ],
            },
            {
                name: "Rapports",
                path: "/compte/rapports",
                collapseId: "rapports",
                iconClass: "chart-simple",
                children: [
                    { name: "Mensuel", path: "/compte/rapports/mensuel" },
                    { name: "Annuel", path: "/compte/rapports/annuel" },
                    { name: "Dépenses par catégorie", path: "/compte/rapports/categories" },
                ],
            },
            {
                name: "Contacts",
                path: "/compte/contacts",
                collapseId: "contacts",
                iconClass: "users",
                children: [
                    { name: "Tous les contacts", path: "/compte/contacts/tous" },
                    { name: "Bénéficiaires", path: "/compte/contacts/beneficiaires" },
                    { name: "Groupes", path: "/compte/contacts/groupes" },
                ],
            },
        ],
    },

    // ========== PARAMÈTRES ==========
    {
        type: "dropdown",
        title: "Paramètres",
        iconClass: "cog",
        name: "parametres",
        collapseId: "parametres",
        path: "/parametres",
        children: [
            {
                name: "Préférences",
                path: "/parametres/preferences",
                collapseId: "preferences",
                iconClass: "sliders",
                children: [
                    { name: "Général", path: "/parametres/preferences/general" },
                    { name: "Notifications", path: "/parametres/preferences/notifications" },
                    { name: "Langue", path: "/parametres/preferences/langue" },
                    { name: "Devises", path: "/parametres/preferences/devises" },
                ],
            },
            {
                name: "Sécurité",
                path: "/parametres/securite",
                collapseId: "securite",
                iconClass: "lock",
                children: [
                    { name: "Mot de passe", path: "/parametres/securite/mot-de-passe" },
                    { name: "2FA", path: "/parametres/securite/2fa" },
                    { name: "Appareils connectés", path: "/parametres/securite/appareils" },
                    { name: "Historique connexions", path: "/parametres/securite/connexions" },
                ],
            },
            {
                name: "Limites & Plafonds",
                path: "/parametres/limites",
                collapseId: "limites",
                iconClass: "gauge-high",
                children: [
                    { name: "Plafonds transactions", path: "/parametres/limites/transactions" },
                    { name: "Plafonds retraits", path: "/parametres/limites/retraits" },
                    { name: "Plafonds dépôts", path: "/parametres/limites/depots" },
                ],
            },
        ],
    },

    // ========== OFFRES ==========
    {
        type: "dropdown",
        title: "Offres & Promotions",
        iconClass: "gift",
        name: "offres",
        badgeCount: "2",
        collapseId: "offres",
        path: "/offres",
        children: [
            { name: "Offres en cours", path: "/offres/en-cours" },
            { name: "Cashback", path: "/offres/cashback" },
            { name: "Parrainage", path: "/offres/parrainage" },
            { name: "Codes promo", path: "/offres/codes" },
        ],
    },

    // ========== SUPPORT ==========
    {
        type: "dropdown",
        title: "Support & Aide",
        iconClass: "headset",
        name: "support",
        collapseId: "support",
        path: "/support",
        children: [
            { name: "Centre d'aide", path: "/support/centre-aide" },
            { name: "FAQ", path: "/support/faq" },
            { name: "Contact support", path: "/support/contact" },
            { name: "Chat en direct", path: "/support/chat" },
            { name: "Statut des services", path: "/support/statut" },
        ],
    },

    // ========== RESSOURCES ==========
    {
        type: "dropdown",
        title: "Ressources",
        iconClass: "ars-progress",
        name: "ressources",
        collapseId: "ressources",
        path: "/ressources",
        children: [
            { name: "API & Développeurs", path: "/ressources/api", iconClass: "code" },
            { name: "Documentation", path: "/ressources/documentation", iconClass: "file-lines" },
            { name: "Conditions générales", path: "/ressources/cgu", iconClass: "file-contract" },
            { name: "Politique confidentialité", path: "/ressources/confidentialite", iconClass: "shield" },
        ],
    },

    // ========== LIENS EXTERNES ==========
    {
        name: "Documentation",
        path: "https://docs.benkky.com",
        iconClass: "document-text",
    },
    {
        name: "Support",
        path: "mailto:support@benkky.com",
        iconClass: "chat-bubble",
    },
];
