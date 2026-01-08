const picker = document.getElementById("colorPicker");
const text = document.getElementById("colorValue");

picker.addEventListener("input", (e) => {
  text.textContent = e.target.value;
});
