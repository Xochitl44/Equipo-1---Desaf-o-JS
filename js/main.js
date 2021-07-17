$("#hamburguer").click( () => {
    $(".sidebar").addClass("d-flex");
    $(".sidebar-content").addClass("d-flex");
    $(".sidebar-overlay").addClass("d-block");
});

$("#close-sidebar").click( () => {
    $(".sidebar").removeClass("d-flex");
    $(".sidebar-content").removeClass("d-flex");
    $(".sidebar-overlay").removeClass("d-block");
});