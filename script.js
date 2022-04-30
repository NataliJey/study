$(function () {

    let $ingredientsList = $('.ingredients-list');
    let url = 'https://raw.githubusercontent.com/NataliJey/study/main/items-1_16_5-100-items.json';
    let $cells = $('.cell');
    let $cellResult = $(`.cell.cell-result`);
    let $itemImages;
    let $searchInput = $(`.ingredients-search-input`);
    let $items;

    dragAndDrop();
    addListeners();

    $.getJSON(url, function (json) {
        for (let i = 0; i < json.length; i++) {
            addIngredient(json[i]);
        }
        console.log(5);
        $itemImages = $(`.item-image`);
        $items = $(`.item`);

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

        $(document).on('mousedown', '.item-image', function (event) {
            let $copy = $(`
            <img class="item-image" src="${this.src}" alt="${this.alt}" id="${this.id}" draggable="false" style="position: absolute">`)
            $(`body`).append($copy);

            moveAt(event.pageX, event.pageY);

            let $hoveredCell = getHoveredCell(event);

            if ($hoveredCell) {
                $hoveredCell.empty();
                if ($hoveredCell.is('.cell-result') === $cellResult.is('.cell-result')) {
                    $(`.items-count-input`).remove();
                }
            }

            $(document).on('mousemove', onMouseMove);


            $copy.mouseup(function (event) {
                $copy.css('position', '');

                let $hoveredCell = getHoveredCell(event);

                if ($hoveredCell === undefined) {
                    $copy.remove();
                } else {
                    $hoveredCell.empty();
                    $hoveredCell.append($copy);
                    isNeedInput($hoveredCell);
                }
                $(document).off('mousemove', onMouseMove)
                $copy.off('mouseup');
            });

            function isNeedInput($hoveredCell) {
                if ($hoveredCell.is('.cell-result') === $cellResult.is('.cell-result')) {
                    let $input = $(`
                <input class="items-count-input" type="number" min="1" max="64" value="1">`)

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

    function addListeners() {
        $searchInput.keydown(function () {
            search()
        })
        $searchInput.keyup(function () {
            search()
        })
    }

    function search() {
        for (let i = 0; i < $itemImages.length; i++) {
            let searchString = $searchInput.val().toLowerCase();
            let alt = $itemImages[i].alt.toLowerCase();
            let id = $itemImages[i].id.toLowerCase();
            if (id.includes(searchString)||alt.includes(searchString)) {
                $($itemImages[i]).show();
                $($items[i]).show();
            } else {
                $($itemImages[i]).hide();
                $($items[i]).hide();
            }
        }
    }
});