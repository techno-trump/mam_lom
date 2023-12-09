class $ayk_lom_view {

	// Тут и ниже, такие поля используются для кеширования.
	// Удалятся при добавлении реактивности, в следующей главе
	_dom_node = null as unknown as Element
	// Создание DOM-ноды и регистрация событий на ней
	dom_node() {
		if ( this._dom_node ) return this._dom_node

		const node = document.createElement( this.dom_name() )

		for ( const [name, fn] of Object.entries(this.event()) ) {
			node.addEventListener(name ,fn)
		}

		// Атрибут с именем класса, для матчинга из css
		node.setAttribute('view', this.constructor.name)

		return this._dom_node = node
	}

	// Актуализация атрибутов и полей
	dom_node_actual() {
		const node = this.dom_node()

		for ( const [name, val] of Object.entries(this.attr()) ) {
			node.setAttribute(name, String(val))
		}

		for ( const [name, val] of Object.entries(this.field()) ) {
			// @ts-ignore
			node[name] = val
		}

		return node
	}

	// Подготовка и рендеринг дочерних компонентов
	dom_tree() {
		const node = this.dom_node_actual()

		const node_list = this.sub().map( node => {
			if ( node === null ) return null
			return node instanceof $ayk_lom_view ? node.dom_tree() : String(node)
		} )

		// Воспользуемся рендером из $mol
		$.$mol_dom_render_children( node , node_list )

		return node
	}

	// Методы ниже будут переопредялятся в компонентах-наследниках
	
	// Имя DOM-элемента
	dom_name() {
		return 'div'
	}
	// Объект с атрибутами
	attr(): { [key: string]: string|number|boolean|null } {
		return {}
	}
	// Объект с событиями
	event(): { [key: string]: (e: Event) => any } {
		return {}
	}
	// Объекст с полями
	field(): { [key: string]: any } {
		return {}
	}
	// Дочерние компоненты
	sub(): Array<$ayk_lom_view | Node | string | number | boolean> {
        return []
    }

}
