import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

export default function App() {
  const [novaTarefa, setNovaTarefa] = useState('');
  const [tarefas, setTarefas] = useState([
    { id: '1', texto: 'Criar wireframe no Figma', concluida: false, prioridade: 'alta' },
    { id: '2', texto: 'Modelar banco de dados', concluida: false, prioridade: 'normal' },
  ]);
  const [filtro, setFiltro] = useState('todas');

  const adicionarTarefa = () => {
    if (novaTarefa.trim() === '') return;

    const item = {
      id: Date.now().toString(),
      texto: novaTarefa,
      concluida: false,
      prioridade: 'normal',
    };

    setTarefas([...tarefas, item]);
    setNovaTarefa('');
  };

  const alternarConcluida = (id) => {
    const tarefasAtualizadas = tarefas.map((t) => {
      if (t.id === id) {
        return { ...t, concluida: !t.concluida };
      }
      return t;
    });
    setTarefas(tarefasAtualizadas);
  };

  const tarefasFiltradas = tarefas.filter((t) => {
    if (filtro === 'pendentes') return !t.concluida;
    if (filtro === 'concluidas') return t.concluida;
    return true;
  });

  const removerTarefa = (id) => {
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>🚀 Gestor de Tarefas Escolar</Text>
      <Text style={styles.subtitulo}>Organize suas entregas e projetos</Text>

      {/* Área de entrada de nova tarefa */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa..."
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa}>
          <Text style={styles.textoBotaoAdicionar}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Botões de Filtro */}
      <View style={styles.filtrosContainer}>
        {['todas', 'pendentes', 'concluidas'].map((opcao) => (
          <TouchableOpacity
            key={opcao}
            style={[styles.botaoFiltro, filtro === opcao && styles.filtroAtivo]}
            onPress={() => setFiltro(opcao)}
          >
            <Text style={[styles.textoFiltro, filtro === opcao && styles.textoFiltroAtivo]}>
              {opcao.charAt(0).toUpperCase() + opcao.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de Tarefas */}
      <FlatList
        data={tarefasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemTarefa}>
            <TouchableOpacity
              style={styles.textoTarefaContainer}
              onPress={() => alternarConcluida(item.id)}
            >
              <Text style={[styles.textoTarefa, item.concluida && styles.tarefaConcluida]}>
                {item.concluida ? '✅ ' : '⬜ '}
                {item.texto}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => removerTarefa(item.id)}>
              <Text style={styles.botaoRemover}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  botaoAdicionar: {
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginLeft: 10,
    borderRadius: 8,
  },
  textoBotaoAdicionar: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  filtrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  botaoFiltro: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    marginHorizontal: 4,
  },
  filtroAtivo: {
    backgroundColor: '#2563EB',
  },
  textoFiltro: {
    color: '#475569',
    fontWeight: '600',
  },
  textoFiltroAtivo: {
    color: '#FFF',
  },
  itemTarefa: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  textoTarefaContainer: {
    flex: 1,
  },
  textoTarefa: {
    fontSize: 16,
    color: '#1E293B',
  },
  tarefaConcluida: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  botaoRemover: {
    fontSize: 18,
    marginLeft: 10,
  },
});
