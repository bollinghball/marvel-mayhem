// CharacterSearchView creates a CharacterListView with its collection.
// When a search occurs, CharacterSearchView modifies its collection with
// the new results, and CharacterListView will automatically re-render itself.
// 
// collection.fetch({
// 	    data: {
// 			nameStartsWith: this.$('.search-input')
// 		}
// })
// 
// jQuery ajax will automatically create query parameters for each property
// in the data object.