import numpy as np 
from mip.model import *
import json

def solveLP(A):
    #*************** Convert A to 2D of numbers **************
    aMatrix = A.replace('[','').replace(']','').split('"')
    aMatrix = [x for x in aMatrix if len(x) > 1]
    

    for i in range(0, len(aMatrix)):
        aMatrix[i] = aMatrix[i].split(',')
        for j in range(0, len(aMatrix[i])):
            aMatrix[i][j] = int(aMatrix[i][j])
    
    #****************** Optimization ******************
    m = Model(sense=MAXIMIZE)

    # creating variables (Note: Gamma is always the last variable)
    x = [ m.add_var(name= 'x{}'.format(i)) for i in range(len(aMatrix[0])) ]

    # creating constraints
    for i in range(len(aMatrix)):
        if i == len(aMatrix) - 1:
            print("hello")
            m += xsum(aMatrix[i][j] * m.var_by_name('x{}'.format(j)) for j in range(len(aMatrix[0]))) <= 1
        else:
            m += xsum(aMatrix[i][j] * m.var_by_name('x{}'.format(j)) for j in range(len(aMatrix[0]))) <= 0
    
    # objective function
    m.objective = maximize(x[len(aMatrix[0]) - 1])
    
    # optimizing the model
    m.optimize()

    output = {}

    for v in m.vars:
        output['{}'.format(v.name)] = v.x
    
    output['gamma'] = output.pop('x{}'.format(len(aMatrix[0]) - 1))

    return output