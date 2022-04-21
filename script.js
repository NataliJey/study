$(function () {

    let $ingredientsList = $('.ingredients-list');
    let url = 'https://api.allorigins.win/raw?url=https://vk.com/doc387129635_634241610?hash=19bjB2vcojacTm6MAPQNbjxkUK4bO9wBE7SLALB9ZU0&dl=U4IvZr0mwWAMO5x2DLNVJVVjTcz2ZOKD9QM5u2N4JWk';
    let $itemImage;
    // let $cell = $('.cell');
    let $item;

    $.getJSON(url, function (json) {
        for (let i = 0; i < json.length; i++) {
            addIngredient(json[i]);
        }
        console.log(5);

        $itemImage = $('.item-image');
        $item = $('.item');
        mousedown();
        // mousemove()

    });

    function addIngredient(item) {
        let $ingredient = $(`
            <div class="item">
                <img class="item-image" src="${item.image}" alt="${item.title}">
            </div>
        `);
        $ingredientsList.append($ingredient);
    }

    function mousedown() {
        $itemImage.mousedown(function () {
            let itemImageCopy = $(`
            <img class="item-image" src="${this.src}" alt="${this.alt}">`)

            $(`body`).append(itemImageCopy);
            let qwer = this.getBoundingClientRect()

            console.log(itemImageCopy, qwer.x)

        })
    }
    // Координаты курсора относительно всего документа
    function mousemove() {
        $(document).mousemove(function(event){
            let x = event.pageX;
            let y = event.pageY;
            // console.log(x,y);
        })
    }

});