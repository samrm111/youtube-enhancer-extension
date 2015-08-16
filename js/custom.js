jQuery.expr[":"].contains = jQuery.expr.createPseudo(function(arg) {
    return function( elem ) {
        return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

$('#guide-subscriptions-container').prepend('<input id="subscriptions-search-sidebar" type="text" placeholder="Search subscriptions">');

$('#subscriptions-search-sidebar').keyup(function(){
  var term = $(this).val();
  if (term.length == 0){
    showAllSubcriptions();
    resetSubscriptions();
  } else {
    hideAllSubscriptions();
    resetSubscriptions();
    findSubscriptions(term);
  }
});

function showAllSubcriptions(){
  $('#guide-channels .guide-notification-item').show();
}

function hideAllSubscriptions(){
  $('#guide-channels .guide-notification-item').hide();

}
function resetSubscriptions(){
  $('.added-to-notification-bar').prependTo('#guide-subscriptions-section .guide-flyout .guide-channels-list');
  $('.added-to-notification-bar').removeClass('added-to-notification-bar');
}
function findSubscriptions(searchTerm){
  $( "#guide-subscriptions-section .guide-flyout .guide-channels-list .guide-notification-item:contains('"+ searchTerm +"'):not(#subscription_manager-guide-item)" ).each(function(){
    $(this).addClass('added-to-notification-bar');
    $(this).appendTo("#guide-channels");
    $(this).show();
  });

  $( "#guide-subscriptions-section .guide-channels-content .guide-notification-item:contains('"+ searchTerm +"')" ).each(function(){
    $(this).appendTo("#guide-channels");
    $(this).show();
  });
}
