# Thumb vs ARM instruction sets

As far as we are concerned, the thumb instruction set is a superset of the plain old ARM instruction set. However, since thumb2 came out, from a programmer's viewpoint, the differences between thumb2 and the ARM  set have almost ceased to be. And, so now the programmer can use almost all of the ARM instruction set in thumb.

### Cortex M3 processors only execute in thumb state

As you might know, the ARM Cortex M3 is only capable of running thumb instructions. What this means is that although from thumb2, we can use almost the regular ARM instruction set with assembly for the M3, one crucial difference remains. 

### Conditional execution

Conditional execution is when you append a condition suffix to some operation, which makes the operation run only when the condition is met, that is, certain condition flag bits e.g. *Z*, *N*, *V* in the **CPSR** (current program status register) are set.

### Conditional Execution in ARM instruction set (i.e CANNOT run in Cortex M3)

For example, the following code written in ARM set to update the value of R4 if the signed
values R0 is greater than R1 and R2 is greater than R3

{% highlight armasm %}
CMP R0 , R1 ; Compare R0 and R1, setting flags
CMPGT R2 , R3 ; If 'greater than', compare R2 and R3, setting flags
MOVGT R4 , R5 ; If still 'greater than', do R4 = R5
{% endhighlight %}

However, this code won't run in ARM Cortex M3 since it uses the the thumb2 instruction set.

### Conditional Execution in thumb2 instruction set

To execute statements conditionally in thumb2, you have two options:

#### 1. Conditional branches

Individual conditional branches are totally supported in thumb. This means you can put a condition code after a branch command and it will branch under the condition just like it does in the ARM instruction set.

For example, the code below branches if *r1* equals *r2*:

{% highlight armasm %}
CMP r1 , r2
BEQ target
target:
{% endhighlight %}

#### 2. Using an *IT* block

If you want to use ARM set style conditional statements except conditional branches, thumb2 has got you covered. However, the only restriction is that you have to enclose the conditional statements in an *IT* or If-Then block. 

Let me write the code I wrote for the ARM instruction set above for thumb2:

{% highlight armasm %}
CMP R0 , R1 ; Compare R0 and R1, setting flags
ITT GT ; Skip next two instructions unless GT condition holds
CMPGT R2 , R3 ; If 'greater than', compare R2 and R3, setting flags
MOVGT R4 , R5 ; If still 'greater than', do R4 = R5
{% endhighlight %}

THE *IT* block of course imposes some restrictions on the programmer like:

1. There can be a maximum of four conditional statements in an IT block e.g ITTTT.

2. The conditional statements after the IT line should follow each other without any other statement in between.

3. For an IT block with else like ITE the else statement has to be an inverse of then like if for the then line you specified the GT (greater than) condition code then for the else line you would have to specify the LE (lesser than or equal to) condition code.
