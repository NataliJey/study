$(function () {

    let $ingredientsList = $('.ingredients-list');
    let url = 'https://api.allorigins.win/raw?url=https://vk.com/doc387129635_634241879?hash=Z5XzIluqyxgzHjPy47WsBekXFS8N0bvGgNWPv6z62b8&dl=0ZzD86B7Io1tenl3Wt5HkcCD0ZmnOWXHQzZP6Gx01ST';
    let $cells = $('.cell');
    let $cellResult = $(`.cell.cell-result`);


    dragAndDrop();

    $.getJSON(url, function (json) {
        for (let i = 0; i < json.length; i++) {
            addIngredient(json[i]);
        }
        console.log(5);
    });

    function addIngredient(item) {
        let $ingredient = $(`
            <div class="item">
                <img class="item-image" id="${item.id}" src="${item.image}" alt="${item.title}" draggable="false">
            </div>
        `);
        $ingredientsList.append($ingredient);
    }

    function isMouseInRect(event, rect) {
        return event.pageX >= rect.left
            && event.pageX <= rect.right
            && event.pageY >= rect.top
            && event.pageY <= rect.bottom;
    }

    function getHoveredCell(event) {
        for (let i = 0; i < $cells.length; i++) {
            let rect = $cells[i].getBoundingClientRect();
            if (isMouseInRect(event, rect)) {
                return $($cells[i]);
            }
        }
    }

    function dragAndDrop() {

        $(document).on('mousedown','.item-image',function (event) {
            let $copy = $(`
            <img class="item-image" src="${this.src}" alt="${this.alt}" draggable="false" style="position: absolute">`)

            console.log(1)
            $(`body`).append($copy);

            console.log(2)
            moveAt(event.pageX, event.pageY);

            console.log(3)
            let $hoveredCell = getHoveredCell(event);

            console.log(4)
            if ($hoveredCell) {
                $hoveredCell.empty();
            }

            console.log(5)
            if ($hoveredCell.is('.cell-result') === $cellResult.is('.cell-result')) {
                $(`.items-count-input`).remove();
            }

            console.log(6)
            $(document).on('mousemove',onMouseMove);

            console.log(7)

            $copy.mouseup(function(event) {
                $copy.css('position', '');

                let $hoveredCell = getHoveredCell(event);

                if ($hoveredCell === undefined) {
                    $copy.remove();
                } else {
                    $hoveredCell.empty();
                    $hoveredCell.append($copy);
                    isNeedInput($hoveredCell);
                }
                $(document).off('mousemove',onMouseMove)
                $copy.off('mouseup');
            });

            function isNeedInput($hoveredCell) {
                if ($hoveredCell.is('.cell-result') === $cellResult.is('.cell-result')) {
                    let $input = $(`
                <input class="items-count-input" type="number" min="1" max="64">`)

                    $(`.items-count-input`).remove();
                    $(`.cell-result-container`).append($input);
                }
            }

            function moveAt(pageX, pageY) {
                $copy.css('left', pageX - $copy.width() / 2 + 'px');
                $copy.css('top', pageY - $copy.height() / 2 + 'px');
            }
            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }
        })
    }
    function f() {
        
    }
});