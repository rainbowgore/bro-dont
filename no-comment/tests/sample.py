"""
This is a docstring, not a comment
It should be preserved
"""
def calculate_sum(a, b):
    result = a + b
    return result
class Calculator:
    """Calculator class with basic operations"""
    def __init__(self):
        self.history = []
    def add(self, x, y):
        result = x + y
        self.history.append(f"{x} + {y} = {result}")
        return result
    def get_history(self):
        return self.history
if __name__ == "__main__":
    calc = Calculator()
    print(calc.add(5, 3))