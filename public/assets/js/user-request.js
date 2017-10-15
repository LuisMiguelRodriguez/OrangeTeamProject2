function displayRecipes(result){

              console.log(result);

              var row = $("<row>");
              $("#results").append(row);

               for(var i = 0; i < result.length; i++){
                //Define recipe Item with props
                var recipeItem = result[i].recipe;

                //Define Jquery Dom elements
                var favButton = $("<a>")
                var colDiv = $("<div>");
                var cardDiv = $("<div>");
                var cardBlock = $("<div>");
                var title = $("<h4>");
                var img = $("<img>");
                var dietLabels = $("<p>");
                var fullRecipe = $("<a>");

                //Add attributes to elements
                favButton.attr({
                  name: recipeItem.label,
                  class: "favButton",
                });

                colDiv.attr({
                  class: "col-md-4 col-sm-6",
                });

                cardDiv.attr({
                  class: "card recipeCard",
                });
  // <span class="glyphicon glyphicon-search" aria-hidden="true"></span>



                img.attr({
                  src: recipeItem.image,
                  alt: recipeItem.label,
                  class: "card-img-top"
                })

                cardBlock.attr({
                  class: "card-block",
                  style: "text-align:center"
                });

                title.attr({
                  class: "card-title",
                  style: "font-weight: bold;"
                })

                title.text(recipeItem.label);


                dietLabels.attr({
                  style: "font-weight:bold;color:black"
                })

                console.log(recipeItem.dietLabels);
                dietLabels.text("Diet Labels : " + recipeItem.dietLabels.toString());

                fullRecipe.attr({
                  href: recipeItem.url,
                  class: "btn btn-primary card-btn",
                  target: "_blank"
                });

                fullRecipe.text("Full Recipe")

                colDiv.append(cardDiv);
                cardDiv.append(img);
                cardDiv.append($("<hr>"))
                cardBlock.append(title);
                cardBlock.append($("<hr>"));
                cardBlock.append(dietLabels);
                cardBlock.append($("<hr>"));
                cardBlock.append(fullRecipe);



                cardDiv.append(cardBlock)

                  $("#results").append(colDiv);
               }

            };

// loader function


function myFavorite() {
  var hearted = $(this);
  console.log("We are in favorites!")


  if (hearted.hasClass("glyphicon-heart-empty")) {
    hearted.removeClass("glyphicon-heart-empty");
    hearted.addClass("glyphicon-heart")
  } else if (hearted.hasClass("glyphicon-heart")) {
    hearted.removeClass("glyphicon-heart");
    hearted.addClass("glyphicon-heart-empty")
  }

  console.log(hearted.attr("label"))

  var foods = {
      label: hearted.attr("label"),
      image: hearted.attr("image"),
      url: hearted.attr("url"),
      dietLabels: hearted.attr("dietLabels"),
  };

  console.log(foods)

  $.post("/api/favorites", foods)
  .done(function(result){
    console.log(result);
  });


};

$(document).ready(function(){

    $('#searchRecipe').keypress(function(e){
        if(e.which == 13){//Enter key pressed
    
            $('#searchRecipeButton').click();//Trigger search button click event
        }
    });

    $("#searchRecipeButton").click(function(){
      event.preventDefault();

      $("#results").empty();

      // for loader spinny thing
        var container = $('<div>');
            container.attr({
              class: "container"
            });

        var row = $('<div>');
            row.attr({
              class: "col-md-12"
            });

        var loadDiv = $('<div>');
            loadDiv.attr({
              id:"loader"
            });

        row.append(loadDiv);
        container.append(row);
        $('#results').append(container);
      // end of loader

        var foods = {
          foods : [],
          health : "peanut-free",
          recipeCount: 10,
          calories: 1000
        };
        var searchedRecipe = $("#searchRecipe").val();

        $.get("api/user").done(function(result){
          console.log("RESULT: ",result)
          
          if (typeof result === "object"){
            var userID;
            if (typeof result.user === "object"){
              userID = result.user.user_id;
            }else{
              userID = result.user;
            }
            var obj = {
              userId: userID,
              foods: searchedRecipe
            }
            $.post("/api/history",obj,function(){});
          }
        });


        console.log(searchedRecipe);
       foods.foods = searchedRecipe.split(" ");
        console.log(foods);

        $.post("api/recipesearch/", foods)
          .done(function(result){
            //to clear the loader
            $("#results").empty();
            console.log(result);

            var row = $("<row>");
            $("#results").append(row);

             for(var i = 0; i < result.length; i++){
              //Define recipe Item with props
              var recipeItem = result[i].recipe;

              //Define Jquery Dom elements
              var favButton = $("<a>")
              var colDiv = $("<div>");
              var cardDiv = $("<div>");
              var cardBlock = $("<div>");
              var title = $("<h4>");
              var img = $("<img>");
              var dietLabels = $("<p>");
              var fullRecipe = $("<a>");
              var myFav = $("<span>")
              var favButton = $("<button>")

              //Add attributes to elements
              favButton.attr({
                label: recipeItem.label,
                dietLabels: recipeItem.dietLabels,
                image: recipeItem.image,
                url: recipeItem.url,
                class: "favButton",
              });

              colDiv.attr({
                class: "col-md-4 col-sm-6",
              });

              cardDiv.attr({
                class: "card recipeCard",
              });

              img.attr({
                src: recipeItem.image,
                alt: recipeItem.label,
                class: "card-img-top"
              })

              cardBlock.attr({
                class: "card-block",
                style: "text-align:center"
              });

              title.attr({
                class: "card-title",
                style: "font-weight: bold;"
              })

              title.text(recipeItem.label);


              dietLabels.attr({
                style: "font-weight:bold;color:black"
              })

              console.log(recipeItem.dietLabels);
              dietLabels.text("Diet Labels : " + recipeItem.dietLabels.toString());

              fullRecipe.attr({
                href: recipeItem.url,
                class: "btn btn-primary card-btn",
                target: "_blank"
              });

              myFav.attr({
                class: "glyphicon glyphicon-heart-empty",
                label: recipeItem.label,
                dietLabels: recipeItem.dietLabels,
                image: recipeItem.image,
                url: recipeItem.url,
              });


              fullRecipe.text("Full Recipe")

              colDiv.append(cardDiv);
              cardDiv.append(img);
              cardDiv.append($("<hr>"))
              cardBlock.append(title);
              cardBlock.append($("<hr>"));
              cardBlock.append(dietLabels);
              cardBlock.append($("<hr>"));
              cardBlock.append(fullRecipe);
              cardBlock.append($("<hr>"));
              cardBlock.append(myFav);
              // cardBlock.append(myFav);

              cardDiv.append(cardBlock)

                $("#results").append(colDiv);
             }

          }
        );
    });
    // To test comment out lines 227,228 and uncomment line 225
    // var data = ["chicken, bread","pork, eggs","butter,ham,egg"]
    $.get("api/user").done(function(result){
      if (typeof result === "object"){
        var userID;
        if (typeof result.user === "object"){
          userID = result.user.user_id;
        }else{
          userID = result.user;
        }
          $.get("/api/history/" + userID,function(data){
            console.log(data);
            if (typeof data === "object"){
              var searchHistory = $("<a/>");
              searchHistory.attr("href","#history");
              searchHistory.attr("data-toggle", "collapse");
              searchHistory.text("Search History");
              var searchList = $("<div class='collapse' id='history'/>");
              for (let i = 0; i < data.length; i++){
                  if (i > 4){
                    break;
                  }
                  var search = $("<div/>");
                  var anch = $("<a class='search-history'/>").text(data[data.length-1-i].item);
                  anch.attr("href","#");
                  search.append(anch);
                  searchList.append(search)
              }

              $(".search-form").after(searchList);
              $(".search-form").after(searchHistory);
              $(".search-history").click(function(){
                event.preventDefault();
                var ingredients = $(this).text();
                console.log(ingredients);
                var food = {
                  foods: ingredients.split(" ")
                }
                $.post("api/recipesearch/",food)
                .done(displayRecipes);
              });
          }
        });
      }
    });

    $(document).on("click", ".glyphicon", myFavorite)


});
