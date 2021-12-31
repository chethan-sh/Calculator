            let bool=false;
            let esp='';
            function append(name)
            {
                    if(!(Number(name)>=0 || Number<=9 || ['+','-','*','/','.'].includes(name)) )
                    {
                        return;
                    }
                    if(bool==true)
                    {
                        if(['+','-','*','/'].includes(name))
                        {

                            bool=false;
                        }
                        else{
                            document.getElementById('num').value='';
                            bool=false;
                        }
                    }
                    let exp='';
                    exp=document.getElementById('num').value;
                    if(exp=='0' && !(['*','/'].includes(name)))
                    {
                         exp='';
                    }
                    if(isNaN(+exp.charAt(exp.length-1)) &&(isNaN(+name)))
                    {
                        if(name=='.')
                        {
                            exp=exp+'0.';
                        }
                        else{
                            exp=exp.slice(0,exp.length-1);
                            exp=exp+name;
                        }
                        document.getElementById('num').value=exp;
                       return;
                    }
                    else
                    {
                            if(name=='.' && !(exp.length>=1))
                            {
                                exp=exp+`0${name}`;
                            }
                            else
                            {
                                if(name=='.')
                                {   
                                    let k=exp.length-1;
                                    while(!(['+','-','*','/'].includes(exp.charAt(k))) && k>=0)
                                    {
                                         if(exp.charAt(k)=='.')
                                        {
                                                exp=exp+'';
                                                return;
                                        }
                                        k--;
                                    }
                                }
                                exp=exp+name;
                            }
                         
                        document.getElementById('num').value=exp;
                        document.getElementById('num').setSelectionRange(0,0);
                     } 
            }
            function clearr()
            {
                
                document.getElementById('num').value='0';
                bool=false;
            }
            function operation()
            {
                
                if(bool==true)
                {
                    let op1='';
                    let op2=''; 
                    let i=esp.length-1;
                    while(((+esp.charAt(i)>=0 && +esp.charAt(i)<=9) || esp.charAt(i)=='.' )&& i>=0)
                    {
                        op1=op1+(esp.charAt(i));
                        i--;
                    }
                    op1=op1.split('').reverse().join('');
                    op2=esp.charAt(i);
                    if(op2=='')
                    {
                        bool=false;
                        return;
                    }
                    let val=document.getElementById('num').value;
                    document.getElementById('num').value=evaluatee(val+op2+op1);
                    return;
                }
                let exp=document.getElementById('num').value;
                let exp2=exp;
                if(exp2.charAt(0)=='/' ||exp2.charAt(0)=='*' || ['+','-','*','/','.'].includes(exp2.charAt(exp2.length-1)) )
                {
                    alert('invalid expression');
                    return;
                }
                esp=exp2;
                if(exp2.charAt(0)=='+' || exp2.charAt(0)=='-')
                {
                    exp2=exp2.slice(1);
                }
                if(!isNaN(+evaluatee(exp2)))
                {
                    document.getElementById('num').value=evaluatee(exp2);
                }
                else{
                    alert("invalid devision");
                    document.getElementById('num').value='0';
                    bool=false;
                    return;
                }
                bool=true;
            }
            function backspace()
            {
               
                if(!bool)
                {
                    let exp=document.getElementById('num').value;
                if(exp.length>1)
                {
                    document.getElementById('num').value=exp.slice(0,exp.length-1);
                }
                else
                {
                    document.getElementById('num').value='0'
                }
                }
                 
            }
function createElement(text,name,classname,rowid)
    {

                let td=document.createElement('td');
                let btn=document.createElement('button');
                btn.innerHTML=text;
                btn.name=name;
                btn.className=classname;
                btn.onclick=function(){
                    if(this.name=='=')
                    {
                        operation();
                    }
                    else if(this.name=='bck')
                    {
                        backspace();
                    }
                    else if(this.name=='c')
                    {
                        clearr();
                    }
                    else{
                        append(this.name);
                    }
                };
                td.appendChild(btn);
                document.getElementById(rowid).append(td);
                
}
function evaluatee(exp)
    {
        let m=(evaluate(exp));
        return m;
    }
	
	function evaluate(expression)
	{
		let tokens = expression.split('');

		// Stack for numbers: 'values'
		let values = [];
		let ops = [];

		for (let i = 0; i < tokens.length; i++)
		{
			if (tokens[i] == ' ')
			{
				continue;
			}
			if (tokens[i] >= '0' && tokens[i] <= '9')
			{
				let sbuf = "";
				while (i < tokens.length &&
						tokens[i] >= '0' &&
							tokens[i] <= '9')
				{
					sbuf = sbuf + tokens[i++];
				}
				values.push(parseInt(sbuf, 10));
		
				i--;
			}

			else if (tokens[i] == '(')
			{
				ops.push(tokens[i]);
			}

			else if (tokens[i] == ')')
			{
				while (ops[ops.length - 1] != '(')
				{
				values.push(applyOp(ops.pop(),
								values.pop(),
								values.pop()));
				}
				ops.pop();
			}

			else if (tokens[i] == '+' ||
					tokens[i] == '-' ||
					tokens[i] == '*' ||
					tokens[i] == '/')
			{
				
				
				while (ops.length > 0 &&
						hasPrecedence(tokens[i],
									ops[ops.length - 1]))
				{
				values.push(applyOp(ops.pop(),
								values.pop(),
								values.pop()));
				}

				ops.push(tokens[i]);
			}
		}

	
		while (ops.length > 0)
		{
			values.push(applyOp(ops.pop(),
							values.pop(),
							values.pop()));
		}


		return values.pop();
	}


	function hasPrecedence(op1, op2)
	{
		if (op2 == '(' || op2 == ')')
		{
			return false;
		}
		if ((op1 == '*' || op1 == '/') &&
			(op2 == '+' || op2 == '-'))
		{
			return false;
		}
		else
		{
			return true;
		}
	}


	function applyOp(op, b, a)
	{
		switch (op)
		{
		case '+':
			return a + b;
		case '-':
			return a - b;
		case '*':
			return a * b;
		case '/':
			if (b == 0)
			{
				return ("Cannot divide by zero");
			}
			return parseInt(a / b, 10);
		}
		return 0;
	}
            