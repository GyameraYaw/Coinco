

document.addEventListener('DOMContentLoaded', function() {
   
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        
        window.location.href = 'login.html';
        return;
    }
    
    
    initializeHomepage(currentUser);
    
    
    if (isNewUser()) {
        showWelcomeModal(currentUser);
    }
    
   
    initializeInteractiveElements();
});


    
    updateUserContent(user);


function isNewUser() {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date().toISOString();
    
    if (!lastVisit) {
        localStorage.setItem('lastVisit', now);
        return true;
    }
    

    const lastVisitDate = new Date(lastVisit);
    const hoursSinceLastVisit = (new Date() - lastVisitDate) / (1000 * 60 * 60);
    
    if (hoursSinceLastVisit > 24) {
        localStorage.setItem('lastVisit', now);
        return true;
    }
    
    return false;
}

function showWelcomeModal(user) {
    const modal = document.getElementById('welcomeModal');
}