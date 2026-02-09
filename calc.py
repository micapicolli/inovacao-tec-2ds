# Programa para calcular a média de 4 números fornecidos pelo usuário

# Passo 1: Solicitar os 4 números via input
# Usamos um loop para pedir os números um por um
numeros = []
for i in range(4):
    valor = input(f"Digite o {i+1}º número: ")
    
    # Passo 2: Converter os valores para float
    numeros.append(float(valor))

# Passo 3: Calcular a média
media = sum(numeros) / len(numeros)

# Passo 4: Exibir o resultado com duas casas decimais
print(f"A média dos números é: {media:.2f}")
