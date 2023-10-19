window.onload = function() {
    let buttons = document.getElementsByTagName("button");
    for(const button of buttons) {
        button.addEventListener('click', function() {
            let value = button.getAttribute("value");
            if(value) {
                let element = document.getElementById(value);
                if(element) {
                    let elements = document.getElementsByClassName(element.className);

                    if(element.className == "contentBox") {
                        for(const el of elements)
                            el.style.display = 'none';
                    }
                    if(element.className == "dialogBox") {
                        document.getElementById("dialogOverlay").style.display = 'block';
                        document.getElementById("menu").style.display = 'none';
                    }

                    element.style.display = 'block';
                } else if (value == "closeDialog") {
                    document.getElementById("dialogOverlay").style.display = 'none';
                    for(const el of document.getElementsByClassName("dialogBox"))
                        el.style.display = 'none';
                    document.getElementById("menu").style.display = 'flex';
                }
            }
        })
    }

const input = document.getElementById("toAccountInput");
let previousValue = "#";
input.addEventListener("input", function () {
    if (input.value.length === 0) {
        input.value = previousValue;
    } else {
      previousValue = input.value;
    }
  });
}
