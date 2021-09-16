CKEDITOR.plugins.add( 'jme', {
    icons: 'jme',
    init: function( editor ) {
        // Plugin logic goes here...
        editor.addCommand( 'jmeDialog', new CKEDITOR.dialogCommand( 'jmeDialog' ) );
        editor.ui.addButton( 'jme', {
				    label: 'JMEditor',
				    command: 'jmeDialog',
				    toolbar: 'insert'
				});
				CKEDITOR.dialog.add( 'jmeDialog', this.path + 'dialogs/jme.js' );
				
    }
});
