var ComponentsGoodsEditer = function(){
	var handleTagsInput = function() {
		if (!jQuery().tagsInput) {
            return;
        }
        $('#tags_1').tagsInput({
            width: 'auto',
            'onAddTag': function () {
                //alert(1);
            },
        });
    };
	
	return {
		init: function(){
			handleTagsInput();
		}
	}
}();
