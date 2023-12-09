class $ayk_lom_input extends $ayk_lom_view {
	dom_name() { return 'input' }

	type() { return 'text' }

	_value = ''
	value( next = this._value ) {
		return this._value = next
	}

	change( e: Event ) {
		this.value( (e.target as HTMLInputElement).value )
	}

	field() {
		return {
			value: this.value(),
		}
	}

	attr() {
		return {
			type: this.type(),
		}
	}

	event() {
		return {
			input: (e: Event)=> this.change(e),
		}
	}
}
