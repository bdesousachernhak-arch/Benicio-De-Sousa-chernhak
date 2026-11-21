import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const STYLES = ['Oferta', 'Review', 'Unboxing'];
const DURATIONS = [15, 30, 60];

export default function App() {
  const [product, setProduct] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Oferta');
  const [duration, setDuration] = useState(30);
  const [images, setImages] = useState([]);
  const [project, setProject] = useState(null);

  async function chooseImages() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Permita o acesso às fotos para adicionar imagens do produto.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: 5,
      quality: 0.85,
    });

    if (!result.canceled) {
      setImages(result.assets.slice(0, 5));
      setProject(null);
    }
  }

  function generateProject() {
    const name = product.trim();
    if (!name) {
      Alert.alert('Falta o produto', 'Digite o nome ou cole o link do produto para continuar.');
      return;
    }
    setProject({ product: name, style: selectedStyle, duration });
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7F5" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <View style={styles.logoMark}><Text style={styles.logoGlyph}>▶</Text></View>
            <Text style={styles.brand}>video<Text style={styles.brandStrong}>vendas</Text></Text>
            <View style={styles.headerTag}><Text style={styles.headerTagText}>BETA</Text></View>
          </View>

          <View style={styles.hero}>
            <Text style={styles.eyebrow}>SEU PRODUTO, EM VÍDEO</Text>
            <Text style={styles.title}>Crie vídeos{ '\n' }que vendem.</Text>
            <Text style={styles.subtitle}>Monte seu projeto em poucos passos. Simples, rápido e direto do celular.</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.sectionHeading}>
              <View style={styles.step}><Text style={styles.stepText}>01</Text></View>
              <View><Text style={styles.sectionTitle}>Qual é o produto?</Text><Text style={styles.sectionHint}>Qualquer produto ou link de afiliado</Text></View>
            </View>
            <TextInput
              value={product}
              onChangeText={(text) => { setProduct(text); setProject(null); }}
              placeholder="Nome ou link do produto"
              placeholderTextColor="#999994"
              style={styles.input}
              autoCapitalize="sentences"
              returnKeyType="done"
            />
          </View>

          <View style={styles.card}>
            <View style={styles.sectionHeading}>
              <View style={styles.step}><Text style={styles.stepText}>02</Text></View>
              <View><Text style={styles.sectionTitle}>Adicione imagens</Text><Text style={styles.sectionHint}>Até 5 fotos do produto</Text></View>
            </View>
            <Pressable onPress={chooseImages} style={({ pressed }) => [styles.uploadButton, pressed && styles.pressed]}>
              <Text style={styles.uploadIcon}>＋</Text>
              <Text style={styles.uploadText}>{images.length ? 'Escolher outras fotos' : 'Selecionar fotos'}</Text>
              <Text style={styles.uploadArrow}>›</Text>
            </Pressable>
            {images.length > 0 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.imageRow}>
                {images.map((image) => <Image key={image.uri} source={{ uri: image.uri }} style={styles.thumbnail} />)}
              </ScrollView>
            )}
          </View>

          <View style={styles.card}>
            <View style={styles.sectionHeading}>
              <View style={styles.step}><Text style={styles.stepText}>03</Text></View>
              <View><Text style={styles.sectionTitle}>Escolha o estilo</Text><Text style={styles.sectionHint}>Qual combina com seu produto?</Text></View>
            </View>
            <View style={styles.optionsRow}>
              {STYLES.map((style) => (
                <Pressable key={style} onPress={() => { setSelectedStyle(style); setProject(null); }} style={[styles.option, selectedStyle === style && styles.optionSelected]}>
                  <Text style={[styles.optionText, selectedStyle === style && styles.optionTextSelected]}>{style}</Text>
                </Pressable>
              ))}
            </View>
            <Text style={styles.durationLabel}>DURAÇÃO DO VÍDEO</Text>
            <View style={styles.optionsRow}>
              {DURATIONS.map((seconds) => (
                <Pressable key={seconds} onPress={() => { setDuration(seconds); setProject(null); }} style={[styles.durationOption, duration === seconds && styles.durationSelected]}>
                  <Text style={[styles.durationText, duration === seconds && styles.durationTextSelected]}>{seconds}s</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <Pressable onPress={generateProject} style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryPressed]}>
            <Text style={styles.primaryButtonText}>Gerar vídeo</Text><Text style={styles.primaryArrow}>↗</Text>
          </Pressable>
          <Text style={styles.footnote}>Formato vertical · Ideal para Reels, TikTok e Shorts</Text>

          {project && (
            <View style={styles.resultCard}>
              <Text style={styles.resultEyebrow}>PROJETO CRIADO</Text>
              <Text style={styles.resultTitle}>{project.product}</Text>
              <Text style={styles.resultDetails}>{project.style}  ·  {project.duration} segundos  ·  Vertical 9:16</Text>
              <Text style={styles.resultNote}>Esta versão é o protótipo da tela e do fluxo. A geração e exportação do arquivo MP4 ainda precisam ser conectadas a um serviço de vídeo.</Text>
            </View>
          )}

          <Text style={styles.footer}>VIDEO VENDAS  ·  FEITO PARA CRIAR</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  screen: { flex: 1, backgroundColor: '#F7F7F5' },
  content: { paddingHorizontal: 22, paddingTop: 16, paddingBottom: 36, maxWidth: 560, width: '100%', alignSelf: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 36 },
  logoMark: { width: 30, height: 30, borderRadius: 9, backgroundColor: '#171715', alignItems: 'center', justifyContent: 'center', marginRight: 9 },
  logoGlyph: { color: '#FFFFFF', fontSize: 11, marginLeft: 2 },
  brand: { color: '#252522', fontSize: 17, letterSpacing: -0.7 },
  brandStrong: { fontWeight: '800' },
  headerTag: { marginLeft: 8, paddingHorizontal: 6, paddingVertical: 3, borderWidth: 1, borderColor: '#D9D9D4', borderRadius: 4 },
  headerTagText: { color: '#777771', fontSize: 8, fontWeight: '700', letterSpacing: 0.7 },
  hero: { marginBottom: 25 },
  eyebrow: { color: '#71716B', fontSize: 10, fontWeight: '700', letterSpacing: 1.8, marginBottom: 11 },
  title: { color: '#1C1C1A', fontSize: 39, lineHeight: 43, fontWeight: '700', letterSpacing: -1.7 },
  subtitle: { color: '#777771', fontSize: 14, lineHeight: 21, marginTop: 11, maxWidth: 330 },
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#ECECE8', borderRadius: 16, padding: 17, marginBottom: 12 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  step: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#F2F2EF', alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  stepText: { color: '#6A6A64', fontSize: 11, fontWeight: '700' },
  sectionTitle: { color: '#242421', fontSize: 14, fontWeight: '700' },
  sectionHint: { color: '#8C8C86', fontSize: 11, marginTop: 3 },
  input: { height: 49, backgroundColor: '#F8F8F6', borderColor: '#EAEAE6', borderWidth: 1, borderRadius: 10, paddingHorizontal: 13, fontSize: 13, color: '#252522' },
  uploadButton: { height: 48, borderRadius: 10, backgroundColor: '#F8F8F6', borderWidth: 1, borderColor: '#EAEAE6', borderStyle: 'dashed', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13 },
  uploadIcon: { fontSize: 19, color: '#55554F', marginRight: 9 },
  uploadText: { flex: 1, color: '#55554F', fontSize: 13, fontWeight: '600' },
  uploadArrow: { color: '#8C8C86', fontSize: 22 },
  imageRow: { gap: 8, paddingTop: 10 },
  thumbnail: { width: 58, height: 58, borderRadius: 9, backgroundColor: '#EEEEEA' },
  optionsRow: { flexDirection: 'row', gap: 8 },
  option: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 40, borderRadius: 9, borderWidth: 1, borderColor: '#EAEAE6', backgroundColor: '#FFFFFF' },
  optionSelected: { backgroundColor: '#1D1D1A', borderColor: '#1D1D1A' },
  optionText: { color: '#666660', fontSize: 12, fontWeight: '600' },
  optionTextSelected: { color: '#FFFFFF' },
  durationLabel: { color: '#8C8C86', fontSize: 9, fontWeight: '700', letterSpacing: 1, marginTop: 19, marginBottom: 9 },
  durationOption: { width: 68, height: 34, borderRadius: 8, borderWidth: 1, borderColor: '#EAEAE6', alignItems: 'center', justifyContent: 'center' },
  durationSelected: { backgroundColor: '#F0F0EC', borderColor: '#A8A8A1' },
  durationText: { color: '#777771', fontSize: 12, fontWeight: '600' },
  durationTextSelected: { color: '#242421' },
  primaryButton: { height: 54, borderRadius: 12, backgroundColor: '#1C1C1A', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 7 },
  primaryPressed: { opacity: 0.85 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  primaryArrow: { color: '#FFFFFF', fontSize: 18, marginLeft: 9, marginTop: -2 },
  pressed: { opacity: 0.75 },
  footnote: { color: '#8C8C86', fontSize: 10, textAlign: 'center', marginTop: 11 },
  resultCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DCDCD5', borderRadius: 14, padding: 16, marginTop: 20 },
  resultEyebrow: { color: '#6C6C65', fontSize: 9, letterSpacing: 1.4, fontWeight: '700', marginBottom: 8 },
  resultTitle: { color: '#22221F', fontSize: 17, fontWeight: '700' },
  resultDetails: { color: '#6E6E68', fontSize: 12, marginTop: 6 },
  resultNote: { color: '#777771', fontSize: 11, lineHeight: 17, marginTop: 12 },
  footer: { color: '#A1A19B', fontSize: 9, letterSpacing: 1.4, textAlign: 'center', marginTop: 28 },
});
