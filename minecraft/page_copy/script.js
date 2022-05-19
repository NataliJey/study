
$(function () {
    let url = 'https://raw.githubusercontent.com/NataliJey/study/main/Recipe constructor/items-1_16_5.json';

    let $craftingTable = $('#crafting-table');
    let $craftingTableGrid = $('#crafting-table-grid');
    let $craftingTableResult = $('#crafting-table-result');
    let $craftingTableResultSlot = null;
    let $craftingTableResultCount = $('#crafting-table-result-count');
    let $shaplessCheckbox = $('#shapless-checkbox');
    let $filenameInput = $('#filename-input');
    let $filenamePreview = $('#filename-preview');
    let $groupInput = $('#group-input');
    let $jsonPreview = $('#json-preview');
    let $downloadButton = $('#download-button');
    let $searchInput = $('#search-input');
    let $minecraftItems = $('#minecraft-items');

    let $draggedItem = $('#dragged-item');
    let $minecraftItemTooltip = $('#minecraft-item-tooltip');

    createCraftingTableGridSlots();
    createCraftingTableResultSlot();
    loadIngredients();
    updateResultSlot();

    $(document).on('mousedown', '.minecraft-slot', function (e) {
        let $slot = $(e.currentTarget).parent();
        let itemInfo = getItemInfo($slot);

        if (itemInfo) {
            takeSlot($slot);
        }
    });

    $(document).on('mousemove', function (e) {
        setDraggedItemPosition(e.pageX, e.pageY);
        setTooltipPosition(e.pageX, e.pageY);
    });

    $(document).on('mouseup', function (e) {
        hideDraggedItem();
    });

    $(document).on('mouseup', '.minecraft-slot', function (e) {
        let $slot = $(e.currentTarget).parent();

        if (isDragging()) {
            dropIntoSlot($slot);
        }
    });

    $(document).on('mouseenter', '.minecraft-slot', function (e) {
        let $slot = $(e.currentTarget).parent();
        let itemInfo = getItemInfo($slot);

        if (itemInfo) {
            setTooltipVisible(true);
            setTooltipContent(itemInfo);
        }
    });

    $(document).on('mouseleave', '.minecraft-slot', function (e) {
        setTooltipVisible(false);
    });

    $searchInput.on('input', function (e) {
        let searchString = $searchInput.val();

        searchIngredients(searchString);
    });

    // Init

    function createCraftingTableGridSlots() {
        let slotCount = 3 * 3;
        for (let i = 0; i < slotCount; i++) {
            let $slot = createSlot();

            $craftingTableGrid.append($slot);
        }
    }

    function createCraftingTableResultSlot() {
        $craftingTableResultSlot = createSlot();

        $craftingTableResultSlot.addClass('large');

        $craftingTableResult.append($craftingTableResultSlot);
    }

    function loadIngredients() {
        $.getJSON(url, function (response) {
            for (let itemInfo of response) {
                let $slot = createSlot(itemInfo);

                $minecraftItems.append($slot);
            }
        });
    }

    // Updates

    function takeSlot($slot) {
        let itemInfo = getItemInfo($slot);

        setDraggedItem(itemInfo);

        if (isCraftingTableSlot($slot)) {
            setSlotContents($slot, null);
        }

        if (isCraftingTableResultSlot($slot)) {
            updateResultSlot();
        }
    }

    function dropIntoSlot($slot) {
        let itemInfo = getItemInfo($draggedItem);

        if (isCraftingTableSlot($slot)) {
            setSlotContents($slot, itemInfo);
        }

        if (isCraftingTableResultSlot($slot)) {
            updateResultSlot();
        }
    }

    function searchIngredients(searchString) {
        let $slots = $minecraftItems.find('.minecraft-slot-container');
        searchString = searchString.toLowerCase();

        for (const slot of $slots) {
            let $slot = $(slot);
            let itemInfo = getItemInfo($slot);
            let localItemId = itemInfo.id.substring(itemInfo.id.indexOf(':') + 1);
            let isVisible = itemInfo.title.toLowerCase().includes(searchString)
                || localItemId.toLowerCase().includes(searchString);

            $slot.toggle(isVisible);
        }
    }

    // Slot operations

    function isCraftingTableSlot($slot) {
        return $.contains($craftingTable[0], $slot[0]);
    }

    function isCraftingTableResultSlot($slot) {
        return $.contains($craftingTableResult[0], $slot[0]);
    }

    function updateResultSlot() {
        let itemInfo = getItemInfo($craftingTableResultSlot);

        if (itemInfo) {
            $craftingTableResultCount.show();
            $craftingTableResultCount.val(1);
        } else {
            $craftingTableResultCount.hide();
        }
    }

    function createSlot(itemInfo) {
        let $slot = $(`
            <div class='minecraft-slot-container minecraft-border'>
                <div class='minecraft-slot'>
                    <img src='${itemInfo ? itemInfo.image : ''}' draggable='false' />
                </div>
            </div>
        `);

        setItemInfo($slot, itemInfo);

        return $slot;
    }

    function setSlotContents($slot, itemInfo) {
        $slot.find('img').attr('src', itemInfo ? itemInfo.image : '');
        setItemInfo($slot, itemInfo);
    }

    // Dragging

    function isDragging() {
        return $draggedItem.is(':visible');
    }

    function setDraggedItem(itemInfo) {
        $draggedItem.show();
        $draggedItem.attr('src', itemInfo.image);
        setItemInfo($draggedItem, itemInfo);
    }

    function hideDraggedItem() {
        $draggedItem.hide();
    }

    function setDraggedItemPosition(x, y) {
        $draggedItem.css({
            left: x + 'px',
            top: y + 'px',
        });
    }

    // Tooltip

    function setTooltipVisible(isVisible) {
        $minecraftItemTooltip.toggle(isVisible);
    }

    function setTooltipContent(itemInfo) {
        $minecraftItemTooltip.find('.item-title').text(itemInfo.title);
        $minecraftItemTooltip.find('.item-id').text(itemInfo.id);
    }

    function setTooltipPosition(x, y) {
        $minecraftItemTooltip.css({
            left: x + 'px',
            top: y + 'px',
        });
    }

    // Utility

    function setItemInfo($element, itemInfo) {
        $element.data('item-info', itemInfo);
    }

    function getItemInfo($element) {
        return $element.data('item-info');
    }
});