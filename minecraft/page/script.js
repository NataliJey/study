
$(function () {
    let $minecraftItems = $('#minecraft-items');
    let $craftingTable = $('#crafting-table');
    let $craftingTableGrid = $('#crafting-table-grid');
    let $craftingTableResult = $('#crafting-table-result');
    let $craftingTableResultSlot = null;
    let $craftingTableResultCount = $('#crafting-table-result-count');
    let $shaplessCheckbox = $('#shapless-checkbox');
    let $filenameInput = $('#filename-input');
    let $groupInput = $('#group-input');
    let $filenameSpan = $('#filename-preview .filename');
    let $jsonPreview = $('#json-preview');
    let $downloadButton = $('#download-button');
    let $searchInput = $('#search-input');
    let $draggedItem = $('#dragged-item');
    let $minecraftItemTooltip = $('#minecraft-item-tooltip');

    let recipeData = {};
    let jsonText = '';



    createCraftingTableGrid();
    createCraftingTableResult();
    loadIngredients();
    updateResultSlot();
    updateRecipeData();

    $(document).on('mousemove', e => {
        if (isDragging()) {
            setDraggedItemPosition(e.pageX, e.pageY);
        }

        updateTooltip(e.pageX, e.pageY);
    });

    $(document).on('mousedown', '.minecraft-slot', e => {
        let $slot = $(e.target).closest('.minecraft-slot-container');

        takeSlot($slot, e.pageX, e.pageY);
    });

    $(document).on('mouseup', e => {
        if (!isDragging()) {
            return;
        }

        let $slot = getSlotOnScreen(e.pageX, e.pageY);

        dropIntoSlot($slot);
    });

    $filenameInput.on('input', updateFilename);
    $groupInput.on('input', updateRecipeData);
    $shaplessCheckbox.on('change', updateRecipeData);
    $craftingTableResultCount.on('input', updateRecipeData);

    $downloadButton.click(e => {
        let filename = $filenameSpan.text() + '.json';

        download(filename, jsonText);
    });

    $searchInput.on('input', e => {
        let query = $searchInput.val();

        searchIngredients(query);
    });



    // Подготовка страницы

    function createCraftingTableGrid() {
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                let $slot = createSlot();

                $craftingTableGrid.append($slot);
            }
        }
    }

    function createCraftingTableResult() {
        let $slot = createSlot();

        $slot.addClass('large');

        $craftingTableResult.append($slot);
        $craftingTableResultSlot = $slot;
    }

    function loadIngredients() {
        $.get({
            url: 'https://raw.githubusercontent.com/NataliJey/study/main/Recipe constructor/items-1_16_5.json',
            dataType: 'json',
            success: minecraftItems => {
                Array.from(minecraftItems).forEach(itemInfo => {
                    let $slot = createSlot(itemInfo);

                    $minecraftItems.append($slot);
                });
            },
        });
    }

    // Основные функции

    function takeSlot($slot, x, y) {
        setDraggedItem($slot.data('item'));
        setDraggedItemPosition(x, y);

        if (isSlotFromTable($slot)) {
            setSlotContents($slot, null);
            updateRecipeData();
        }
    }

    function dropIntoSlot($slot) {
        if ($slot && isSlotFromTable($slot)) {
            let itemInfo = $draggedItem.data('item');

            setSlotContents($slot, itemInfo);
        }

        setDraggedItem(null);
        updateResultSlot();
        updateRecipeData();
    }

    function isDragging() {
        return $draggedItem.is(':visible');
    }

    function searchIngredients(query) {
        if (!query) {
            $minecraftItems.find('.minecraft-slot-container').show();
            return;
        }

        $minecraftItems.find('.minecraft-slot-container').each((index, element) => {
            let $slot = $(element);
            let itemInfo = $slot.data('item');
            let lowerCaseQuery = query.toLowerCase();
            let localItemId = itemInfo.id.substring(itemInfo.id.indexOf(':') + 1);
            let visible = itemInfo.title.toLowerCase().indexOf(lowerCaseQuery) !== -1
                || localItemId.toLowerCase().indexOf(lowerCaseQuery) !== -1;

            $slot.toggle(visible);
        });
    }

    function updateResultSlot() {
        let itemInfo = $craftingTableResultSlot.data('item');
        let itemId = itemInfo?.id ?? '';
        let localItemId = itemId.substring(itemId.indexOf(':') + 1);

        $filenameInput.attr('placeholder', localItemId ?? 'crafting_recipe');
        $craftingTableResultCount.toggle(!!itemId);

        if (!itemId) {
            $craftingTableResultCount.val(1);
        }

        updateFilename();
    }

    function updateFilename() {
        let filename = $filenameInput.val();
        let placeholder = $filenameInput.attr('placeholder');

        $filenameSpan.text(filename || placeholder);
    }

    function updateTooltip(x, y) {
        let $slot = getSlotOnScreen(x, y);
        let itemInfo = $slot?.data('item') ?? null;

        $minecraftItemTooltip.toggle(!!itemInfo);

        if (itemInfo) {
            let tooltipItemId = $minecraftItemTooltip.data('item')?.id ?? null;

            if (tooltipItemId !== itemInfo.id) {
                setTooltipItem(itemInfo);
            }

            setTooltipPosition(x, y);
        }
    }

    function updateRecipeData() {
        let type = $shaplessCheckbox.is(':checked') ? 'minecraft:crafting_shapeless' : 'minecraft:crafting_shaped';
        let group = $groupInput.val();
        let gridItemIds = $craftingTableGrid
            .find('.minecraft-slot-container')
            .map((index, element) => $(element).data('item')?.id ?? '')
            .get();
        let resultItemId = $craftingTableResultSlot.data('item')?.id ?? '';
        let resultCount = +$craftingTableResultCount.val();

        recipeData = createRecipeData(type, group, gridItemIds, resultItemId, resultCount);
        jsonText = JSON.stringify(recipeData, null, 4);

        $jsonPreview.text(jsonText);
    }

    function createRecipeData(recipeType, group, gridItemIds, resultItemId, resultCount) {
        let recipeData = {
            type: recipeType
        };

        if (group) {
            recipeData.group = group;
        }

        if (recipeType === 'minecraft:crafting_shaped') {
            let keys = createPatternKeys(gridItemIds);

            recipeData.pattern = createPattern(gridItemIds, keys, 3, 3);
            recipeData.key = {};

            for (let [itemId, key] of keys.entries()) {
                recipeData.key[key] = {
                    item: itemId
                };
            }
        } else {
            recipeData.ingredients = gridItemIds.filter(i => i).map(itemId => {
                return {
                    item: itemId,
                };
            });
        }

        recipeData.result = {};

        if (resultItemId) {
            recipeData.result.item = resultItemId;
        }

        if (resultCount > 1) {
            recipeData.result.count = resultCount;
        }

        return recipeData;
    }

    function createPattern(gridItemIds, keys, width, height) {
        let pattern = new Array(3);
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        for (let y = 0; y < height; y++) {
            pattern[y] = new Array(3);

            for (let x = 0; x < width; x++) {
                let index = y * 3 + x;
                let gridItemId = gridItemIds[index];
                let key = keys.get(gridItemId);

                pattern[y][x] = key ?? ' ';

                minX = Math.min(minX, key ? x : Infinity);
                minY = Math.min(minY, key ? y : Infinity);
                maxX = Math.max(maxX, key ? x : -Infinity);
                maxY = Math.max(maxY, key ? y : -Infinity);
            }
        }

        pattern = pattern.slice(minY, maxY + 1).map(row => {
            return row.slice(minX, maxX + 1).join('');
        });

        return pattern;
    }

    function createPatternKeys(gridItemIds) {
        let itemIdSet = new Set(gridItemIds.filter(i => i));
        let patterns = new Map();
        let unusedLetters = new Set(Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ'));

        for (let itemId of itemIdSet) {
            if (patterns.size === 0) {
                patterns.set(itemId, '#');
                continue;
            }

            let letter = itemId.charAt(itemId.indexOf(':') + 1).toUpperCase();

            if (!unusedLetters.has(letter)) {
                letter = getRandomItem(unusedLetters);
            }

            unusedLetters.delete(letter);
            patterns.set(itemId, letter);
        }

        return patterns;
    }

    // Утилитные функции

    function setTooltipItem(itemInfo) {
        $minecraftItemTooltip.find('.item-title').text(itemInfo?.title);
        $minecraftItemTooltip.find('.item-id').text(itemInfo?.id);
    }

    function setTooltipPosition(x, y) {
        $minecraftItemTooltip.css({
            left: x + 'px',
            top: y + 'px',
        });
    }

    function getRandomItem(set) {
        let items = Array.from(set);
        return items[Math.floor(Math.random() * items.length)];
    }

    function isSlotFromTable($slot) {
        return $.contains($craftingTable[0], $slot[0]);
    }

    function getSlotOnScreen(x, y) {
        let elements = document.elementsFromPoint(x, y);

        for (let element of elements) {
            if (element.classList.contains('minecraft-slot-container')) {
                return $(element);
            }
        }

        return null;
    }

    function setDraggedItem(itemInfo) {
        $draggedItem.toggle(!!itemInfo);
        $draggedItem.data('item', itemInfo);
        $draggedItem.attr('src', itemInfo?.image);
    }

    function setDraggedItemPosition(x, y) {
        $draggedItem.css({
            left: x + 'px',
            top: y + 'px',
        });
    }

    function createSlot(itemInfo) {
        let $slot = $(`
            <div class='minecraft-slot-container minecraft-border'>
                <div class='minecraft-slot'>
                    <img src="${itemInfo?.image ?? ''}">
                </div>
            </div>
        `);

        $slot.data('item', itemInfo);

        return $slot;
    }

    function setSlotContents($slot, itemInfo) {
        $slot.find('img').attr('src', itemInfo?.image ?? '');
        $slot.data('item', itemInfo);
    }

    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
});