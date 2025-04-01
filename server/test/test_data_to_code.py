
import math
code = """
def circle_area(r):
    return math.pi * r * r
"""
exec(code)
area = circle_area(2)
print(area) 