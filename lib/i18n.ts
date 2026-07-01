import type { Category } from "./data";

export const SUPPORTED_LANGUAGES = [
  { locale: "en", label: "English" },
  { locale: "ja", label: "日本語" },
  { locale: "es", label: "Español" },
  { locale: "pt", label: "Português" },
  { locale: "fr", label: "Français" },
  { locale: "ko", label: "한국어" }
] as const;

export type Locale = (typeof SUPPORTED_LANGUAGES)[number]["locale"];
export const LANGUAGE_STORAGE_KEY = "debaticaLanguage";

const en = {
  "language.label": "Display language",
  "nav.home": "Home", "nav.search": "Search", "nav.create": "Create", "nav.categories": "Categories", "nav.help": "Help", "nav.guest": "Guest",
  "action.report": "Report", "action.reported": "Reported", "action.delete": "Delete", "action.reply": "Reply", "action.translate": "Translate", "action.original": "Show original", "action.post": "Post", "action.cancel": "Cancel", "action.save": "Save changes", "action.skip": "Skip", "action.shareX": "Share on X",
  "sort.best": "Best", "sort.new": "New", "sort.old": "Old", "status.trending": "🔥 Trending", "status.rising": "⬆ Rising", "status.new": "🟢 New",
  "thread.back": "← Back to debates", "thread.started": "Started {time} ago", "thread.votePrompt": "Where do you stand?", "thread.agree": "Agree", "thread.disagree": "Disagree", "thread.noVotesYet": "Be the first to vote", "thread.previewVote": "Your vote has been saved.", "thread.comments": "{count} comments", "thread.discussion": "DISCUSSION", "thread.now": "now", "thread.noVote": "no vote", "thread.points": "{count} points", "thread.write": "Write a comment...", "thread.composerNote": "Saved with your Guest ID · No URLs", "thread.translationSoon": "Translation will be available soon.", "thread.replying": "Replying to #{number}",
  "card.join": "Join debate", "card.votes": "{count} votes",
  "report.title": "Report this content", "report.description": "Contact the Faraday team on X.", "report.message": "Message us on X", "report.close": "Close report dialog",
  "profile.kicker": "GUEST", "profile.title": "Guest Profile", "profile.description": "Manage the optional context shown with comments from this browser.", "profile.guestId": "Guest ID", "profile.local": "This browser only", "profile.details": "Profile details", "profile.age": "Age range", "profile.country": "Country / region", "profile.private": "Prefer not to say", "profile.saved": "Saved",
  "home.kicker": "A place to disagree thoughtfully", "home.title": "What do you really think?", "home.subtitle": "Pick a side. Say why. Stay curious.", "home.today": "Today's debate", "home.live": "Live", "home.enter": "Enter the debate", "home.hot": "Hot Debates", "home.active": "Most Active", "home.momentum": "gaining momentum ↗", "home.closest": "Closest Split", "home.latest": "Latest Debates", "home.categories": "Categories", "home.seeAll": "See all", "home.browseAll": "Browse all",
  "category.AI & Work": "AI & Work", "category.AI & Tech": "AI & Tech", "category.World Cup": "World Cup", "category.Immigration": "Immigration", "category.Cost of Living": "Cost of Living", "category.Society": "Society", "category.Politics": "Politics", "category.Work & Business": "Work & Business", "category.Money": "Money", "category.Relationships": "Relationships", "category.Technology": "Technology", "category.Entertainment": "Entertainment", "category.Sports": "Sports", "category.Education": "Education", "category.Lifestyle": "Lifestyle"
};

export type TranslationKey = keyof typeof en;
type Dictionary = Record<TranslationKey, string>;

const ja: Dictionary = {
  "language.label": "表示言語", "nav.home": "ホーム", "nav.search": "検索", "nav.create": "投稿", "nav.categories": "カテゴリ", "nav.help": "ヘルプ", "nav.guest": "ゲスト",
  "action.report": "報告", "action.reported": "報告済み", "action.delete": "削除", "action.reply": "返信", "action.translate": "翻訳", "action.original": "原文を表示", "action.post": "投稿", "action.cancel": "キャンセル", "action.save": "変更を保存", "action.skip": "スキップ", "action.shareX": "Xでシェア",
  "sort.best": "ベスト", "sort.new": "新着", "sort.old": "古い順", "status.trending": "🔥 トレンド", "status.rising": "⬆ 急上昇", "status.new": "🟢 新着",
  "thread.back": "← 議論一覧へ", "thread.started": "{time}前に開始", "thread.votePrompt": "あなたの意見は？", "thread.agree": "賛成", "thread.disagree": "反対", "thread.noVotesYet": "最初の投票をしよう", "thread.previewVote": "投票を保存しました。", "thread.comments": "コメント {count}件", "thread.discussion": "ディスカッション", "thread.now": "たった今", "thread.noVote": "未投票", "thread.points": "{count}ポイント", "thread.write": "コメントを書く...", "thread.composerNote": "ゲストIDで保存 · URL不可", "thread.translationSoon": "翻訳機能は近日公開予定です。", "thread.replying": "#{number} に返信中",
  "card.join": "議論に参加", "card.votes": "投票 {count}件",
  "report.title": "このコンテンツを報告", "report.description": "XのDMでモデレーターへご連絡ください。", "report.message": "Xでモデレーターに連絡", "report.close": "報告ダイアログを閉じる",
  "profile.kicker": "ゲスト", "profile.title": "ゲストプロフィール", "profile.description": "このブラウザのコメントに表示する任意情報を管理します。", "profile.guestId": "ゲストID", "profile.local": "このブラウザのみ", "profile.details": "プロフィール詳細", "profile.age": "年齢層", "profile.country": "国・地域", "profile.private": "回答しない", "profile.saved": "保存しました",
  "home.kicker": "丁寧に意見を交わす場所", "home.title": "あなたは本当はどう思う？", "home.subtitle": "立場を選び、理由を話し、好奇心を忘れずに。", "home.today": "今日の議論", "home.live": "進行中", "home.enter": "議論を見る", "home.hot": "注目の議論", "home.active": "活発な議論", "home.momentum": "盛り上がり中 ↗", "home.closest": "接戦の議論", "home.latest": "新着の議論", "home.categories": "カテゴリ", "home.seeAll": "すべて見る", "home.browseAll": "一覧を見る",
  "category.AI & Work": "AIと仕事", "category.AI & Tech": "AIとテック", "category.World Cup": "ワールドカップ", "category.Immigration": "移民", "category.Cost of Living": "生活費", "category.Society": "社会", "category.Politics": "政治", "category.Work & Business": "仕事・ビジネス", "category.Money": "お金", "category.Relationships": "人間関係", "category.Technology": "テクノロジー", "category.Entertainment": "エンタメ", "category.Sports": "スポーツ", "category.Education": "教育", "category.Lifestyle": "ライフスタイル"
};

const es: Dictionary = {
  "language.label": "Idioma", "nav.home": "Inicio", "nav.search": "Buscar", "nav.create": "Crear", "nav.categories": "Categorías", "nav.help": "Ayuda", "nav.guest": "Invitado",
  "action.report": "Reportar", "action.reported": "Reportado", "action.delete": "Eliminar", "action.reply": "Responder", "action.translate": "Traducir", "action.original": "Ver original", "action.post": "Publicar", "action.cancel": "Cancelar", "action.save": "Guardar cambios", "action.skip": "Omitir", "action.shareX": "Compartir en X",
  "sort.best": "Mejores", "sort.new": "Nuevos", "sort.old": "Antiguos", "status.trending": "🔥 Tendencia", "status.rising": "⬆ En ascenso", "status.new": "🟢 Nuevo",
  "thread.back": "← Volver a debates", "thread.started": "Iniciado hace {time}", "thread.votePrompt": "¿Qué opinas?", "thread.agree": "De acuerdo", "thread.disagree": "En desacuerdo", "thread.noVotesYet": "Sé la primera persona en votar", "thread.previewVote": "Tu voto ha sido guardado.", "thread.comments": "{count} comentarios", "thread.discussion": "DEBATE", "thread.now": "ahora", "thread.noVote": "sin voto", "thread.points": "{count} puntos", "thread.write": "Escribe un comentario...", "thread.composerNote": "Guardado con tu ID de invitado · Sin URL", "thread.translationSoon": "La traducción estará disponible pronto.", "thread.replying": "Respondiendo a #{number}",
  "card.join": "Participar", "card.votes": "{count} votos", "report.title": "Reportar este contenido", "report.description": "Contacta a los moderadores por mensaje directo en X.", "report.message": "Contactar en X", "report.close": "Cerrar diálogo de reporte",
  "profile.kicker": "INVITADO", "profile.title": "Perfil de invitado", "profile.description": "Gestiona el contexto opcional mostrado con tus comentarios.", "profile.guestId": "ID de invitado", "profile.local": "Solo este navegador", "profile.details": "Detalles del perfil", "profile.age": "Edad", "profile.country": "País / región", "profile.private": "Prefiero no decirlo", "profile.saved": "Guardado",
  "home.kicker": "Un lugar para discrepar con respeto", "home.title": "¿Qué piensas realmente?", "home.subtitle": "Elige una postura. Explica por qué. Mantén la curiosidad.", "home.today": "Debate de hoy", "home.live": "En vivo", "home.enter": "Entrar al debate", "home.hot": "Debates destacados", "home.active": "Más activos", "home.momentum": "ganando impulso ↗", "home.closest": "Más igualados", "home.latest": "Debates recientes", "home.categories": "Categorías", "home.seeAll": "Ver todos", "home.browseAll": "Explorar",
  "category.AI & Work": "IA y trabajo", "category.AI & Tech": "IA y tecnología", "category.World Cup": "Copa Mundial", "category.Immigration": "Inmigración", "category.Cost of Living": "Costo de vida", "category.Society": "Sociedad", "category.Politics": "Política", "category.Work & Business": "Trabajo y negocios", "category.Money": "Dinero", "category.Relationships": "Relaciones", "category.Technology": "Tecnología", "category.Entertainment": "Entretenimiento", "category.Sports": "Deportes", "category.Education": "Educación", "category.Lifestyle": "Estilo de vida"
};

const pt: Dictionary = {
  "language.label": "Idioma", "nav.home": "Início", "nav.search": "Buscar", "nav.create": "Criar", "nav.categories": "Categorias", "nav.help": "Ajuda", "nav.guest": "Visitante",
  "action.report": "Denunciar", "action.reported": "Denunciado", "action.delete": "Excluir", "action.reply": "Responder", "action.translate": "Traduzir", "action.original": "Ver original", "action.post": "Publicar", "action.cancel": "Cancelar", "action.save": "Salvar alterações", "action.skip": "Pular", "action.shareX": "Compartilhar no X",
  "sort.best": "Melhores", "sort.new": "Novos", "sort.old": "Antigos", "status.trending": "🔥 Tendência", "status.rising": "⬆ Em alta", "status.new": "🟢 Novo",
  "thread.back": "← Voltar aos debates", "thread.started": "Iniciado há {time}", "thread.votePrompt": "Qual é a sua opinião?", "thread.agree": "Concordo", "thread.disagree": "Discordo", "thread.noVotesYet": "Seja a primeira pessoa a votar", "thread.previewVote": "Seu voto foi salvo.", "thread.comments": "{count} comentários", "thread.discussion": "DISCUSSÃO", "thread.now": "agora", "thread.noVote": "sem voto", "thread.points": "{count} pontos", "thread.write": "Escreva um comentário...", "thread.composerNote": "Salvo com seu ID de visitante · Sem URLs", "thread.translationSoon": "A tradução estará disponível em breve.", "thread.replying": "Respondendo a #{number}",
  "card.join": "Participar", "card.votes": "{count} votos", "report.title": "Denunciar este conteúdo", "report.description": "Entre em contato com a moderação por DM no X.", "report.message": "Falar com a moderação no X", "report.close": "Fechar denúncia",
  "profile.kicker": "VISITANTE", "profile.title": "Perfil de visitante", "profile.description": "Gerencie o contexto opcional exibido com seus comentários.", "profile.guestId": "ID de visitante", "profile.local": "Somente neste navegador", "profile.details": "Detalhes do perfil", "profile.age": "Faixa etária", "profile.country": "País / região", "profile.private": "Prefiro não informar", "profile.saved": "Salvo",
  "home.kicker": "Um lugar para discordar com respeito", "home.title": "O que você realmente pensa?", "home.subtitle": "Escolha um lado. Diga por quê. Continue curioso.", "home.today": "Debate de hoje", "home.live": "Ao vivo", "home.enter": "Entrar no debate", "home.hot": "Debates em destaque", "home.active": "Mais ativos", "home.momentum": "ganhando força ↗", "home.closest": "Mais equilibrados", "home.latest": "Debates recentes", "home.categories": "Categorias", "home.seeAll": "Ver todos", "home.browseAll": "Explorar",
  "category.AI & Work": "IA e trabalho", "category.AI & Tech": "IA e tecnologia", "category.World Cup": "Copa do Mundo", "category.Immigration": "Imigração", "category.Cost of Living": "Custo de vida", "category.Society": "Sociedade", "category.Politics": "Política", "category.Work & Business": "Trabalho e negócios", "category.Money": "Dinheiro", "category.Relationships": "Relacionamentos", "category.Technology": "Tecnologia", "category.Entertainment": "Entretenimento", "category.Sports": "Esportes", "category.Education": "Educação", "category.Lifestyle": "Estilo de vida"
};

const fr: Dictionary = {
  "language.label": "Langue", "nav.home": "Accueil", "nav.search": "Recherche", "nav.create": "Créer", "nav.categories": "Catégories", "nav.help": "Aide", "nav.guest": "Invité",
  "action.report": "Signaler", "action.reported": "Signalé", "action.delete": "Supprimer", "action.reply": "Répondre", "action.translate": "Traduire", "action.original": "Voir l’original", "action.post": "Publier", "action.cancel": "Annuler", "action.save": "Enregistrer", "action.skip": "Ignorer", "action.shareX": "Partager sur X",
  "sort.best": "Meilleurs", "sort.new": "Nouveaux", "sort.old": "Anciens", "status.trending": "🔥 Tendance", "status.rising": "⬆ En hausse", "status.new": "🟢 Nouveau",
  "thread.back": "← Retour aux débats", "thread.started": "Lancé il y a {time}", "thread.votePrompt": "Quel est votre avis ?", "thread.agree": "D’accord", "thread.disagree": "Pas d’accord", "thread.noVotesYet": "Soyez la première personne à voter", "thread.previewVote": "Votre vote a été enregistré.", "thread.comments": "{count} commentaires", "thread.discussion": "DISCUSSION", "thread.now": "maintenant", "thread.noVote": "sans vote", "thread.points": "{count} points", "thread.write": "Écrire un commentaire...", "thread.composerNote": "Enregistré avec votre ID invité · Sans URL", "thread.translationSoon": "La traduction sera bientôt disponible.", "thread.replying": "Réponse à #{number}",
  "card.join": "Participer", "card.votes": "{count} votes", "report.title": "Signaler ce contenu", "report.description": "Contactez la modération par message privé sur X.", "report.message": "Contacter sur X", "report.close": "Fermer le signalement",
  "profile.kicker": "INVITÉ", "profile.title": "Profil invité", "profile.description": "Gérez les informations facultatives affichées avec vos commentaires.", "profile.guestId": "ID invité", "profile.local": "Ce navigateur uniquement", "profile.details": "Détails du profil", "profile.age": "Tranche d’âge", "profile.country": "Pays / région", "profile.private": "Ne pas préciser", "profile.saved": "Enregistré",
  "home.kicker": "Un espace pour débattre avec respect", "home.title": "Qu’en pensez-vous vraiment ?", "home.subtitle": "Choisissez un camp. Expliquez pourquoi. Restez curieux.", "home.today": "Débat du jour", "home.live": "En direct", "home.enter": "Voir le débat", "home.hot": "Débats populaires", "home.active": "Plus actifs", "home.momentum": "en pleine progression ↗", "home.closest": "Les plus serrés", "home.latest": "Débats récents", "home.categories": "Catégories", "home.seeAll": "Tout voir", "home.browseAll": "Explorer",
  "category.AI & Work": "IA et travail", "category.AI & Tech": "IA et technologie", "category.World Cup": "Coupe du monde", "category.Immigration": "Immigration", "category.Cost of Living": "Coût de la vie", "category.Society": "Société", "category.Politics": "Politique", "category.Work & Business": "Travail et affaires", "category.Money": "Argent", "category.Relationships": "Relations", "category.Technology": "Technologie", "category.Entertainment": "Divertissement", "category.Sports": "Sports", "category.Education": "Éducation", "category.Lifestyle": "Mode de vie"
};

const ko: Dictionary = {
  "language.label": "표시 언어", "nav.home": "홈", "nav.search": "검색", "nav.create": "작성", "nav.categories": "카테고리", "nav.help": "도움말", "nav.guest": "게스트",
  "action.report": "신고", "action.reported": "신고됨", "action.delete": "삭제", "action.reply": "답글", "action.translate": "번역", "action.original": "원문 보기", "action.post": "게시", "action.cancel": "취소", "action.save": "변경 저장", "action.skip": "건너뛰기", "action.shareX": "X에 공유",
  "sort.best": "베스트", "sort.new": "최신", "sort.old": "오래된 순", "status.trending": "🔥 트렌딩", "status.rising": "⬆ 급상승", "status.new": "🟢 신규",
  "thread.back": "← 토론 목록으로", "thread.started": "{time} 전에 시작", "thread.votePrompt": "어떻게 생각하시나요?", "thread.agree": "동의", "thread.disagree": "반대", "thread.noVotesYet": "첫 번째로 투표해 보세요", "thread.previewVote": "투표가 저장되었습니다.", "thread.comments": "댓글 {count}개", "thread.discussion": "토론", "thread.now": "방금", "thread.noVote": "투표 없음", "thread.points": "{count}포인트", "thread.write": "댓글 작성...", "thread.composerNote": "게스트 ID로 저장 · URL 불가", "thread.translationSoon": "번역 기능은 곧 제공될 예정입니다.", "thread.replying": "#{number}에 답글 작성 중",
  "card.join": "토론 참여", "card.votes": "투표 {count}개", "report.title": "이 콘텐츠 신고", "report.description": "X DM으로 운영진에게 문의해 주세요.", "report.message": "X에서 운영진에게 문의", "report.close": "신고 창 닫기",
  "profile.kicker": "게스트", "profile.title": "게스트 프로필", "profile.description": "이 브라우저의 댓글에 표시할 선택 정보를 관리합니다.", "profile.guestId": "게스트 ID", "profile.local": "이 브라우저에서만", "profile.details": "프로필 상세", "profile.age": "연령대", "profile.country": "국가 / 지역", "profile.private": "응답하지 않음", "profile.saved": "저장됨",
  "home.kicker": "서로의 의견을 존중하며 토론하는 곳", "home.title": "당신의 진짜 생각은 무엇인가요?", "home.subtitle": "입장을 고르고 이유를 말하며 호기심을 유지하세요.", "home.today": "오늘의 토론", "home.live": "진행 중", "home.enter": "토론 보기", "home.hot": "인기 토론", "home.active": "활발한 토론", "home.momentum": "관심 증가 중 ↗", "home.closest": "팽팽한 토론", "home.latest": "최신 토론", "home.categories": "카테고리", "home.seeAll": "모두 보기", "home.browseAll": "전체 보기",
  "category.AI & Work": "AI와 일", "category.AI & Tech": "AI와 기술", "category.World Cup": "월드컵", "category.Immigration": "이민", "category.Cost of Living": "생활비", "category.Society": "사회", "category.Politics": "정치", "category.Work & Business": "업무·비즈니스", "category.Money": "금융", "category.Relationships": "관계", "category.Technology": "기술", "category.Entertainment": "엔터테인먼트", "category.Sports": "스포츠", "category.Education": "교육", "category.Lifestyle": "라이프스타일"
};

export const dictionaries: Record<Locale, Dictionary> = { en, ja, es, pt, fr, ko };

export function isLocale(value: string | null): value is Locale {
  return SUPPORTED_LANGUAGES.some((language) => language.locale === value);
}

export function categoryTranslationKey(category: Category): TranslationKey {
  return `category.${category}` as TranslationKey;
}
