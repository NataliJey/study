$(function () {

    let url = 'https://raw.githubusercontent.com/NataliJey/study/main/items-1_16_5-100-items.json';
    let $ingredientsList = $('.ingredients-list');
    let $cells = $('.cell');
    let $cellResult = $(`.cell.cell-result`);
    let $itemImages;
    let $searchInput = $(`.ingredients-search-input`);
    let $items;
    let idItems = {};

    let $checkbox = $(`.checkbox-input`);

    dragAndDrop();
    addListeners();

    $.getJSON(url, function (json) {
        for (let i = 0; i < json.length; i++) {
            addIngredient(json[i]);
        }
        console.log(5);
        $itemImages = $(`.item-image`);
        $items = $(`.item`);
        $items.find('.item-plate').hide();
        $cells.find('.item-plate').hide();
        plate();
        updateJson();
    });

    function addIngredient(item) {
        let $ingredient = $(`
            <div class="item">
                <img class="item-image" id="${item.id}" src="${item.image}" alt="${item.title}" draggable="false">
                <div class="item-plate">
                    <div>${item.title}</div> 
                    <div>${item.id}</div>
                </div>
            </div>
        `);
        $ingredientsList.append($ingredient);
    }

    function isMouseInRect(event, rect) {
        return event.clientX >= rect.left
            && event.clientX <= rect.right
            && event.clientY >= rect.top
            && event.clientY <= rect.bottom;
    }

    function getHoveredElement(event, elements) {
        for (let i = 0; i < elements.length; i++) {
            let rect = elements[i].getBoundingClientRect();
            if (isMouseInRect(event, rect)) {
                return $(elements[i]);
            }
        }
    }

    function dragAndDrop() {

        $(document).on('mousedown', '.item-image', function (event) {
            let $copy = $(`
            <img class="item-image" src="${this.src}" alt="${this.alt}" id="${this.id}" draggable="false" style="position: absolute">
                <div class="item-plate" style="top: 100%; left: 0;">
                    <div>${this.alt}</div> 
                    <div>${this.id}</div>
                </div>`);
            $(`body`).append($copy);
            $copy.filter('.item-plate').hide();

            moveAt(event.pageX, event.pageY);

            let $hoveredCell = getHoveredElement(event, $cells);

            if ($hoveredCell) {
                $hoveredCell.empty();
                if ($hoveredCell.is('.cell-result') === $cellResult.is('.cell-result')) {
                    $(`.items-count-input`).remove();
                }
                updateJson();
            }

            $(document).on('mousemove', onMouseMove);


            $copy.mouseup(function (event) {
                $copy.css('position', '');

                let $hoveredCell = getHoveredElement(event, $cells);

                if ($hoveredCell === undefined) {
                    $copy.remove();
                } else {
                    $hoveredCell.empty();
                    $hoveredCell.append($copy);
                    isNeedInput($hoveredCell);
                    updateJson();
                }
                $(document).off('mousemove', onMouseMove)
                $copy.off('mouseup');
            });

            function isNeedInput($hoveredCell) {
                if ($hoveredCell.is('.cell-result')) {
                    let $input = $(`
                <input class="items-count-input" type="number" min="1" max="64" value="1">`)

                    $(`.items-count-input`).remove();
                    $(`.cell-result-container`).append($input);
                    updateJson();
                }
            }

            function moveAt(pageX, pageY) {
                $copy.filter('.item-image').css('left', pageX - $copy.width() / 2 + 'px');
                $copy.filter('.item-image').css('top', pageY - $copy.height() / 2 + 'px');
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }
        })
    }

    $(document).on("click", '.items-count-input', function () {
        updateJson();
    })
    $(document).on("click", '.checkbox-input', function () {
        updateJson();
    })


    function search() {
        for (let i = 0; i < $itemImages.length; i++) {
            let searchString = $searchInput.val().toLowerCase();
            let alt = $itemImages[i].alt.toLowerCase();
            let id = $itemImages[i].id.toLowerCase();
            if (id.includes(searchString) || alt.includes(searchString)) {
                $($itemImages[i]).show();
                $($items[i]).show();
            } else {
                $($itemImages[i]).hide();
                $($items[i]).hide();
            }
        }
    }

    function plate() {
        $(document).on('mousemove', function (event) {
            $items.find('.item-plate').hide();
            $cells.find('.item-plate').hide();
            let $item = getHoveredElement(event, $items);
            let $cell = getHoveredElement(event, $cells);
            if ($item) {
                $item.find('.item-plate').show();
            }
            if ($cell) {
                $cell.find('.item-plate').show();
            }
        });
    }

    function updateJson() {
        let recipe;
        if (isChecked($checkbox)) {
            recipe = {
                type: "minecraft:crafting_shapeless",
                ingredients: [],
            }
            addIngredients(recipe);
        } else {
            recipe = {
                type: "minecraft:crafting_shaped",
                pattern: [],
                key: {},
            }
            addKey(recipe);
            addPattern(recipe);
        }
        addResult(recipe);
        displayJson(recipe);
    }

    function addIngredients(recipe) {
        let $itemImagesInCell = $('.cell:not(.cell-result)').find('.item-image');
        for (let i = 0; i < $itemImagesInCell.length; i++) {
            recipe.ingredients.push({item: $itemImagesInCell[i].id});
        }
    }

    function addKey(recipe) {
        let $itemImagesInCell = $('.cell:not(.cell-result)').find('.item-image');
        idItems = {};
        for (let i = 0; i < $itemImagesInCell.length; i++) {
            let itemImageInCell = $itemImagesInCell[i];
            if (!isKeyInObject(itemImageInCell.id, idItems)) {
                let nameItem = getNameItem(recipe, itemImageInCell);
                recipe.key[nameItem] = {item: itemImageInCell.id};
                idItems[itemImageInCell.id] = nameItem;
            }
        }
        console.log(idItems);
    }

    function addPattern(recipe) {
        let $cells = $('.cell:not(.cell-result)');
        recipe.pattern = ["", "", ""];
        for (let i = 0; i < $cells.length; i++) {
            let $cell = $($cells[i]);
            let $itemImageInCell = $cell.find('.item-image');
            let y = Math.floor(i / 3);
            let positionItem = " ";
            if ($itemImageInCell.length > 0) {
                positionItem = idItems[$itemImageInCell[0].id]
            }
            recipe.pattern[y] += positionItem;
        }//TODO сейчас позиция сделана на целый квадрат три на три, нужно, чтобы она фиксилась, если предметы стоят в квадрате два на два и убирались лишние
        //    пробелы. Остались инпуты с опциями, не забыть доделать и кнопку скачивания
    }

    function getNameItem(recipe, itemImageInCell) {
        let nameItem = "#";
        if (isKeyInObject(nameItem, recipe.key)) {
            nameItem = itemImageInCell.alt.charAt(0);
        }
        while (isKeyInObject(nameItem, recipe.key)) {
            nameItem = getRandomLetter();
        }
        return nameItem;
    }

    function isKeyInObject(key, object) {
        return key in object;
    }

    function getRandomLetter() {
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return possible.charAt(Math.floor(Math.random() * possible.length));
    }

    function addResult(recipe) {
        recipe.result = {};
        let $itemImageInCellResult = $('.cell-result').find('.item-image');
        if ($itemImageInCellResult.length > 0) {
            recipe.result.item = $itemImageInCellResult[0].id;
            recipe.result.count = +$(`.items-count-input`).val();
        }
    }

    function displayJson(recipe) {
        let json = JSON.stringify(recipe, null, '    ');
        $(`pre`).text(json);
    }

    function isChecked($element) {
        return $element[0].checked;
    }

    function addListeners() {
        $searchInput.keydown(function () {
            search()
        })
        $searchInput.keyup(function () {
            search()
        })
    }

});