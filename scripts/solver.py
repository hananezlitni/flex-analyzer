import numpy as np 
from mip import *
import json
import logging

# Console Logging
logging.basicConfig(level='INFO')

def solveLP(A):
    #*************** Convert A to 2D of numbers **************
    aMatrix = A.replace('[','').replace(']','').split('"')
    aMatrix = [x for x in aMatrix if len(x) > 1]
    

    for i in range(0, len(aMatrix)):
        aMatrix[i] = aMatrix[i].split(',')
        for j in range(0, len(aMatrix[i])):
            aMatrix[i][j] = float(aMatrix[i][j])
    
    #****************** Optimization ******************
    m = Model(sense=MAXIMIZE)
    m.verbose = False

    # creating variables (Note: Gamma is always the last variable)
    x = [ m.add_var(name= 'x{}'.format(i)) for i in range(len(aMatrix[0])) ]

    # creating constraints
    for i in range(len(aMatrix)):
        if i == len(aMatrix) - 1:
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

    result = {
        'output': output
    }

    return result

if __name__ == '__main__':
#    from codecs import decode
    import sys
    import logging

    print(solveLP(sys.argv[1]))
    #print(solveLP(sys.argv[1]))
#    print(sys.argv[2])
#    input = decode(sys.argv[2], 'unicode_escape')
#    globals()[sys.argv[1]](str(input))