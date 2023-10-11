
  
  $(document).ready(function () {
    // Function to update the checked count
    function updateCheckedCount() {
      // Get all the checkboxes with the class "form-check-input"
      const checkboxes = $(".form-check-input");
  
      // Initialize a variable to count the checked checkboxes
      let checkedCount = 0;
  
      // Loop through the checkboxes and count the checked ones
      checkboxes.each(function () {
        if ($(this).prop("checked")) {
          checkedCount++;
        }
      });
  
      // Update the text of the "checked-count" element
      const checkedCountElement = $("#checked-count");
      checkedCountElement.text(checkedCount + "/92");
    }
  
    // Attach an event listener to each checkbox to update the count when checked/unchecked
    $(".form-check-input").change(updateCheckedCount);
  
    // Call the function initially to set the count to 0/24
    updateCheckedCount();
  
    // Attach a change event listener to each checkbox and input field
    $('input[type="checkbox"]').change(updateReviewText);
    $(".input-field").on("input", updateReviewText);
    $(".input-field-info").on("input", updateReviewText);
    // Add a click event listener to the "Export to PDF" button
    // Add a click event listener to the "Export to PDF" button
    $("#exportPdfButton").click(function () {
      // Check if at least one comment is added (text is not empty)
      if (isAtLeastOneCommentAdded()) {
        exportToPdf();
      } else {
        alert("Please add at least one comment before exporting to PDF.");
      }
    });
  
    function updateReviewText() {
      // Initialize an empty string for the review text
      let textToAdd = "";
      let carInfo = "";
      // Loop through the checkboxes and input fields
      $('input[type="checkbox"]').each(function (index) {
        const inputField = $(".input-field").eq(index);
  
        if ($(this).is(":checked")) {
          // Checkbox is checked, add text to review section with enumeration
          const checkboxLabel = $(this).next("label").text();
          const inputValue = inputField.val();
  
          if ($.trim(inputValue) !== "") {
            // Add enumeration and line break
            textToAdd += `<div style="display: flex; align-items: center;"><div>${
              index + 1
            }.</div><div>${checkboxLabel}: ${inputValue}</div></div>`;
          }
        }
      });
      const yearInputValue = $("#year").val();
      const makeInputValue = $("#make").val();
      const modelInputValue = $("#model").val();
      const priceInputValue = $("#price").val();
      const tradeInputValue = $("#trade-in").val();
  
      if ($.trim(yearInputValue) !== "") {
        carInfo += `<div>Year: ${yearInputValue}</div>`;
      }
  
      if ($.trim(makeInputValue) !== "") {
        carInfo += `<div>Make: ${makeInputValue}</div>`;
      }
      if ($.trim(modelInputValue) !== "") {
        carInfo += `<div>Model: ${modelInputValue}</div>`;
      }
      if ($.trim(priceInputValue) !== "") {
        carInfo += `<div>Price: ${priceInputValue}</div>`;
      }
      if ($.trim(tradeInputValue) !== "") {
        carInfo += `<div>Trade-In: ${tradeInputValue}</div>`;
      }
      $(".car-info").html(carInfo);
  
      // Update the review text element with HTML
      $(".review-text").html(textToAdd);
    }
  
    function exportToPdf() {
      // Create a new jsPDF instance
      window.jsPDF = window.jspdf.jsPDF;
  
      const pdf = new jsPDF({
        orientation: "p",
        unit: "pt",
        format: "letter",
        putOnlyUsedFonts: true,
      });
  
      // Get the review text content
      const reviewText = $(".review-section").html();
  
      // Get the current date in a formatted string
      const now = new Date();
      const formattedDate = now.toLocaleDateString().replaceAll("/", "-");
  
      // Generate a filename with the date
      const filename = `review-${formattedDate}.pdf`;
  
      // Save the PDF with the updated filename
      pdf.html(reviewText, {
        width: 580,
        windowWidth: 580,
        margin: 15,
        callback: function () {
          console.log(reviewText); // to debug
          pdf.save(filename);
        },
      });
    }
    // Helper function to check if at least one comment is added
    function isAtLeastOneCommentAdded() {
      let atLeastOneCommentAdded = false;
  
      // Loop through input fields and check if any has non-empty value
      $(".input-field").each(function () {
        if ($.trim($(this).val()) !== "") {
          atLeastOneCommentAdded = true;
          return false; // Exit the loop if a non-empty input is found
        }
      });
  
      return atLeastOneCommentAdded;
    }
  });
  