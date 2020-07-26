$(document).ready(function(){
// this block of code will generate image gallery.
        var skills_item = [];
        var titles = [];
        var names =[];
        var src = [];
        var link = [];
        // accessing gallery.json file through JQuery
        $.getJSON( "gallery.json", function(data) {
            var skills = [];
            // pushing all the values of key "skill, names" in JSON.
            $.each(data.gallery, function(key, val){
                skills_item.push(val.skill);
                names.push(val.title);
                src.push(val.image);
                link.push(val.link);
                });
            // The aforementioned values can be multiple in an array. This will bring all the values into one array.
            $.each(skills_item, function(i){
                $.each(skills_item[i], function(j){
                        skills.push(skills_item[i][j])
                    })
            })
            // this removes duplicate elements in skills array. This converts the array into a set and converts
            // it back to an array.
            var skills_set = new Set(skills);
            skills = [...skills_set];

            // This will generate buttons with an ID, which is a skill name in skills array.
            for(var i = 0; i < skills.length; i++) {
                $('.gallery_button_row').append('<div class = "nanum gallery_button" id =' + skills[i] + '>' + skills[i]+ '</div>')
            };

            // determining which button is clicked by checking the ID, and add the correct number of the
            // image box based on the skills. When all is clicked, all the projects will be shown.
            $('.gallery_button').on("click", function(){

                let name = $(this).attr('id');
                let count = 0;
                let index = [];
                $('.project').remove();

                if (name != 'all') {
                    for (let i = 0; i < skills_item.length; i++) {
                        for (let j = 0; j < skills_item[i].length; j++) {
                            if (skills_item[i][j] == name) {
                                count++;
                                index.push(i);
                            }
                        }
                    }
                }else {
                    for (let i = 0; i < skills_item.length; i++) {
                        count++;
                        index.push(i);
                    }
                }

                for(let k = count-1; k > -1 ; k--){
                    titles.push('<article class = "project" id ="' + names[index[k]] +'"><a href = "'+link[k]+'"><img src= "'+ src[index[k]]+ '"></a></article>')
                }

                $('.gallery_image').append(titles.join(""));
                titles = [];

                // allowing the title of the project to appear when mouse is hovered over each image gallery.
//                $('.gallery_image .project').hover(
//                    function()
//                    {
//                        $(this).append('<p>' + $(this).attr('id')+ '</p>');
//                        $(this).find('img').css("opacity","0.3");
//                        $(this).find('p').css("opacity","1");
//
//                    },
//                    function()
//                    {
//                        $('.pic p').remove();
//                        $(this).find('img').css("opacity","1");
//                    });
                });
        });
});