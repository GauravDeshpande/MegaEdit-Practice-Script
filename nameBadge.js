// establishing a script
var Script = {
    Setup: new Setup()
};



//Servers as an object
function Setup() {
  //Declare attributes here. This refers to the instance of the Setup obj thats declared
  var menuOptions = ['Small', 'Medium', 'Large'];
  var albumOptions = ['ASU_Advanced Materials Initiative_Horiz_RGB_MaroonGold_150ppi', 'ASU_AISSS_Master_RGB_Digital_FINAL_XXXX19_Horiz_RGB_MaroonGold_150ppi', 'ASU_Alumni_Horiz_RGB_MaroonGold_150ppi', 'ASU_AmericanIndianPolicy_Horiz_RGB_MaroonGold_150ppi', 'ASU_AmerIndianStudies_Horiz_RGB_MaroonGold_150ppi'];
  var ui = new MEUITableLayout();
  var label = new MEUILabel();
  var clipart;
  var menuSelector;
  var albumSelector;

  this.sidebar = function (callback) {
    var sidebarSize = 800; //Size of the sidebar

    // Creating a sidebar that has the label and button side by side
    var sidebarcontentVertical = new MEUIStackLayout(false);

    var sidebarcontentHorizontal = new MEUIStackLayout(true);
    // Create a dropdown menu listed with the following options in menu options
     menuSelector = new MEUIDropDown(menuOptions, menuOptions[0], function () { changeCb(); });
     albumSelector = new MEUIDropDown(albumOptions, albumOptions[0], function () { changeLogo(); });
     console.log('Options of menu selector');
     console.log(menuSelector);
     console.log('Options of album selector');
     console.log(albumSelector);
    // adding the button to the sidebar
    // sidebarcontent.Add(newButton);
    // sidebarcontent.Add(textBox);
    sidebarcontentVertical.Add(menuSelector);
    sidebarcontentVertical.Add(albumSelector);


    // This statement will actually show the sidebar with all of its contents on ASU Print Online store
    Editor.UI.Add(null, Editor.Constants.UIDestination.FreeTarget, sidebarcontentVertical);

    // // Call this method once the page is loaded
    // changeCb();

    // If menu options exist to the following
    if(menuOptions.length > 1) {
    // Giving clarity what the text box is referring to
    ui.AddRowHelper("Enter Name Below:");

    // Establishing properties of the name field text box
    var userName = new MEUITextBox("", function (nameValue) {
      Document.Fields.ByName('userName', function(nameField){
          nameField[0].uioptions.placeholderText = "Name";
          nameField[0].text.data = nameValue.Properties.Value;
          nameField[0].Save();

        });
    });
    // add a row of name title to the table
    ui.AddRow([userName]);

    // Giving clarity what the text box is referring to
    ui.AddRowHelper("Enter Job Title Below:");

    // Establishing properties of the job field text box
    var jobTitle = new MEUITextBox("", function (jobValue) {
      Document.Fields.ByName('jobTitle', function(jobField){
          jobField[0].text.defaultFormat.fontSize = 8;
          jobField[0].uioptions.placeholderText = "Job Title";
          jobField[0].text.data = jobValue.Properties.Value;
          jobField[0].Save();

        });
    });
    // add a row of job title to the table
    ui.AddRow([jobTitle]);

    ui.AddRowHelper("Enter Department Below:");

    // Establishing properties of the department field text box
    var departmentTitle = new MEUITextBox("", function (departmentValue) {
      Document.Fields.ByName('departmentName', function(departmentField){
          departmentField[0].text.defaultFormat.fontSize = 6;
          departmentField[0].uioptions.placeholderText = "Department";
          departmentField[0].text.data = departmentValue.Properties.Value;
          departmentField[0].Save();

        });
    });
    // add a row of department title to the table
    ui.AddRow([departmentTitle]);
}

sidebarcontentHorizontal.Add(ui);
Editor.UI.Add(null, Editor.Constants.UIDestination.FreeTarget, sidebarcontentHorizontal);


    Editor.UI.ShowEditorUi(Editor.Constants.UIDestination.FreeTarget, true, function () {
        Editor.UI.SetEditorUiData(Editor.Constants.UIDestination.FreeTarget, sidebarSize); // Sets the sidebar data

    });

    //If the user is NOT an admin remove certain UI elements such as the Pages (viewed at bottom of editor), View Control,Tab Area
    if (!Editor.IsAdmin()) {
          Editor.ReportLoadStep("FrameScriptLayoutDone");
          Editor.UI.ShowEditorUi("Pages", false, function() {
            Editor.UI.ShowEditorUi("ViewControls", false, function() {
                Editor.UI.ShowEditorUi("TabArea", false, function() {
                    Editor.ReportLoadStep("FrameScriptLayoutDone");
                });
            });
        });
    }
    callback();

};

this.getResources = function() {
  /*
  * How to get all the images in an album in order to be used in the product
  * Its a good idea to load all resources like images before you start contructing the sidebar due to the ayschronous runtime of js
  */
  Editor.Resources.ClipartAlbums(function(albums) { //This will return ALL the ClipartAlbums
    //select the album you want

    for (var i = 0; i < albums.length; i++) {

        if (albums[i].name === "Logos") { //Clipart albums are added in the Catfish Dynamic Products
            Editor.Resources.ClipartItems(albums[i].id, function(items) { //Returns a list of items in the album by searching for its ID
                // console.log("These are the items");

                // console.log(items);
                //If array exists
                if (items && items.length) {
                    clipart = items;
                    console.log('This is the clipart');
                    console.log(clipart);
                    //Loop through every item in array, push it to array
                    // for (var i = 0; i < items.length; ++i) {
                      var item = items[i];
                      // console.log('this is the clipart');
                      // console.log(clipart);

                      // changeLogo();

                // }
              }
                else {
                  //Display an error is there is a problem when loading the images
                    Editor.UI.ShowError("Moulding clipart album is not configure or it doesn't contain any items.");
                }
            });
        }
    }
  });
};



    // Depending on the option selected from the drop down, do the following three options
    var changeCb = function () {
      Document.Fields.ByName('userName', function(nameField){
        console.log('I am in change cb');
          nameField[0].text.options.fitToBox.withWrap = true;

          // Depending on the menu option selected from the drop down apply the following format to the name field
          if(menuSelector.Value === 'Small') {

            nameField[0].text.defaultFormat.fontSize = 10;
            nameField[0].area.w = 40;
            nameField[0].Save();
          }
          else if(menuSelector.Value === 'Medium') {
            nameField[0].text.defaultFormat.fontSize = 20;
            nameField[0].area.w = 50;

            nameField[0].Save();
          }
          else if(menuSelector.Value === 'Large') {
            nameField[0].text.defaultFormat.fontSize = 30;
            nameField[0].area.w = 60;
            nameField[0].Save();
          }



        });

  };


// Function used to change the logo

  changeLogo = function() {
   Document.Fields.ByName('logoImages', function(logoField) {
     // Setting to true in order to allow ClipArt Images
     logoField[0].image.isClipArt = true;

       if(albumSelector.Value === albumOptions[0]) {
           logoField[0].image.data = clipart[0];
           logoField[0].Save();
           logoField[0].Refresh();
           console.log('logoField');
       }
       else if(albumSelector.Value === albumOptions[1]) {
         logoField[0].image.data = clipart[1];
         logoField[0].Save();
         logoField[0].Refresh();
       }
       else if(albumSelector.Value === albumOptions[2]) {
         logoField[0].image.data = clipart[2];
         logoField[0].Save();
         logoField[0].Refresh();
       }
       else if(albumSelector.Value === albumOptions[3]) {
         logoField[0].image.data = clipart[3];
         logoField[0].Save();
         logoField[0].Refresh();
       }
       else if(albumSelector.Value === albumOptions[4]) {
         logoField[0].image.data = clipart[4];
         logoField[0].Save();
         logoField[0].Refresh();
       }
       else {
         console.log('Logo does not exist');
       }
   });
 };



  //... etc
  //Serves as the entry function to run when page is loaded
  this.init = function () {
    this.sidebar(this.getResources);
    // this.sidebar();

  };


}


//Run the init function
Script.Setup.init();
