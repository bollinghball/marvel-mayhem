// You'll probably have one instance of this view created by AppView. It then listens 
// for some event on the mediator/dispatcher like "modal:show" that is passed a view.
// The view passed with the event will be rendered inside of the ModalView and it will
// add a class to itself so that it appears on the screen.
// 
// e.g. ListItemView on click:
// 
// Backbone.trigger('modal:show', new DetailView({ model: this.model }));