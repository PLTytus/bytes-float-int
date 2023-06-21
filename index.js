document.onreadystatechange = function(){
	document.querySelectorAll("input[type=text]").forEach(input => {
		input.addEventListener("input", function(){
			this.value = this.value.trim().toUpperCase();

			if(this.name == "float"){
				this.value = this.value.replace(',', '.').replace(/[^0-9\.\-]/g, '');
				document.querySelector("[name=int]").value = new Int32Array(new Float32Array([this.value]).buffer)[0];
			} else if(this.name == "int"){
				this.value = this.value.replace(/[^0-9\-]/g, '');
				document.querySelector("[name=float]").value = new Float32Array(new Int32Array([this.value]).buffer)[0];
			}
		});

		input.addEventListener("click", function(){
			this.focus();
			this.select();
		});
	});
}