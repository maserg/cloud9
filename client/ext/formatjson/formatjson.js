/**
 * Extension Manager for the Ajax.org Cloud IDE
 *
 * @copyright 2010, Ajax.org B.V.
 * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>
 */
require.def("ext/formatjson/formatjson",
    ["core/ide", 
     "core/ext", 
     "core/util", 
     "ext/editors/editors", 
     "ace/Range", 
     "text!ext/formatjson/formatjson.xml"],
    function(ide, ext, util, editors, Range, markup) {
        
return ext.register("ext/formatjson/formatjson", {
    name   : "JSON Formatter",
    dev    : "Ajax.org",
    alone  : true,
    type   : ext.GENERAL,
    markup : markup,
    
    nodes : [],
    
    format : function(indent){
        var editor = editors.currentEditor;

        var sel   = editor.getSelection();
        var doc   = editor.getDocument();
        var range = sel.getRange();
        var value = doc.getTextRange(range);
        try{
            value = JSON.stringify(JSON.parse(value), null, indent);
        }
        catch(e){
            util.alert(
                "Invalid JSON", 
                "The selection contains an invalid or incomplete JSON string",
                "Please correct the JSON and try again");
            return;
        }
        
        var end = doc.replace(range, value);
        sel.setSelectionRange(Range.fromPoints(range.start, end));
    },
    
    hook : function(){
        var _self = this;
        this.nodes.push(
            ide.mnuEdit.appendChild(new apf.item({
                caption : "Format JSON",
                onclick : function(){
                    ext.initExtension(_self);
                    _self.winFormat.show();
                }
            }))
        );
    },
    
    init : function(amlNode){
        this.winFormat = winFormat;
    },
    
    enable : function(){
        this.nodes.each(function(item){
            item.enable();
        });
    },
    
    disable : function(){
        this.nodes.each(function(item){
            item.disable();
        });
    },
    
    destroy : function(){
        this.nodes.each(function(item){
            item.destroy(true, true);
        });
        this.nodes = [];
        this.winFormat.destroy(true, true);
    }
});

    }
);