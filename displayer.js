Draw.loadPlugin(function(ui) {
	// console.log(ui);
	let div = document.createElement('div');
	div.style.background = '#ffffff';
	div.style.width = '100%';
	div.style.height= '100%';
	div.style.border = '1px solid #000000';
	div.style.boxSizing = 'border-box';
	div.innerHTML = '<p>TEST</p>';
	
	let iiw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	
	dataWindow = new mxWindow('Data', div, iiw - 320, 60, 200, 130, true, true);
	
	dataWindow.destroyOnClose = false;
	dataWindow.setMaximizable(false);
	dataWindow.setResizable(true);
	dataWindow.setScrollable(true);
	dataWindow.setClosable(true);
	dataWindow.setVisible(true);
	dataWindow.contentWrapper.style.overflowY = 'scroll';

	// console.log(dataWindow);
	
	let graph = ui.editor.graph;

	mxResources.parse('showDisplayer=Toggle displayer')

	ui.actions.addAction('showDisplayer', () => {
		dataWindow.setVisible(dataWindow.isVisible());
	});

	let menuFunction = (menu) => {
		ui.menus.addMenuItem(menu, 'showDisplayer');
	}

	let menu = ui.menubar.addMenu('Displayer', menuFunction);
	menu.parentNode.insertBefore(menu, menu.previousSibling.previousSibling.previousSibling);

	let changeBox = (sender, evt) => {
		let cell = graph.getSelectionCell();
		if(cell) {
			div.innerHTML = '';
			let attr = (cell.value != null) ? cell.value.attributes : null;
			if(!attr) return;
			Object
				.keys(attr)
				.filter((key) => {
					return attr[key].localName.startsWith('desc.');
				})
				.forEach((current) => {
					let paragraph = document.createElement('p');
					paragraph.innerHTML = attr[current].value;
					div.appendChild(paragraph)
				});
		} else {
			div.innerHTML = 'Select item to show';
		}
	}
	
	graph.selectionModel.addListener(mxEvent.CHANGE, changeBox);
	graph.model.addListener(mxEvent.CHANGE, changeBox);
});