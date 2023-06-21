document.onreadystatechange = function(){
	document.querySelectorAll("input").forEach(input => {
		input.addEventListener("click", function(){
			this.focus();
			this.select();
		});
	});

	document.querySelectorAll("[name=bytesfloatint] input[type=text]").forEach(input => {
		input.addEventListener("input", function(){
			this.value = this.value.trim().toUpperCase();

			if(this.name == "float"){
				this.value = this.value.replace(',', '.').replace(/[^0-9\.\-]/g, '');
				document.querySelector("[name=bytesfloatint] [name=int]").value = new Int32Array(new Float32Array([this.value]).buffer)[0];
			} else if(this.name == "int"){
				this.value = this.value.replace(/[^0-9\-]/g, '');
				document.querySelector("[name=bytesfloatint] [name=float]").value = new Float32Array(new Int32Array([this.value]).buffer)[0];
			}
		});
	});

	document.querySelectorAll("[name=uintsinthex] input[type=text]").forEach(input => {
		input.addEventListener("input", function(){
			this.value = this.value.trim().toUpperCase();

			if(this.name == "uint"){
				this.value = this.value.replace(/[^0-9]/g, '');
				document.querySelector("[name=uintsinthex] [name=sint]").value = this.value | 0;
				document.querySelector("[name=uintsinthex] [name=hex]").value = (+this.value).toString(16).toUpperCase();
			} else if(this.name == "sint"){
				this.value = this.value.replace(/[^0-9\-]/g, '');
				document.querySelector("[name=uintsinthex] [name=uint]").value = this.value >>> 0;
				document.querySelector("[name=uintsinthex] [name=hex]").value = (this.value >>> 0).toString(16).toUpperCase();
			} else if(this.name == "hex"){
				this.value = this.value.toUpperCase().replace(/[^A-F0-9]/g, '');
				document.querySelector("[name=uintsinthex] [name=sint]").value = parseInt(this.value, 16) | 0;
				document.querySelector("[name=uintsinthex] [name=uint]").value = parseInt(this.value, 16) >>> 0;
			}

			let pm = parseInt(document.querySelector("[name=uintsinthex] [name=pm]").value) || 0;
			let sint = parseInt(document.querySelector("[name=uintsinthex] [name=sint]").value) || 0;
			document.querySelector("[name=uintsinthex] [name=puint]").value = (sint + pm) >>> 0
			document.querySelector("[name=uintsinthex] [name=psint]").value = sint + pm;
			document.querySelector("[name=uintsinthex] [name=phex]").value = ((sint + pm) >>> 0).toString(16).toUpperCase();
			document.querySelector("[name=uintsinthex] [name=muint]").value = (sint - pm) >>> 0
			document.querySelector("[name=uintsinthex] [name=msint]").value = sint - pm;
			document.querySelector("[name=uintsinthex] [name=mhex]").value = ((sint - pm) >>> 0).toString(16).toUpperCase();
		});
	});
}