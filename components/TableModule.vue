<template>
  <div>
    <v-container>
      <v-autocomplete
        v-model="select"
        :items="words"
        :filter="filter"
        item-text="jp"
        label="ワード"
        outlined
        dense
        hide-details
        prepend-icon="mdi-cursor-default-click"
      >
      </v-autocomplete>
    </v-container>
    <v-container
      v-if="position"
    >
      <v-icon>mdi-check</v-icon>
      <v-chip
        class="mx-1"
      >
        {{position}}
      </v-chip>
    </v-container>
    <v-container
      v-if="pushList"
    >
      <table><tr><td>
        <v-icon>mdi-check</v-icon>
      </td><td>
        <v-chip
          v-for="(word, index) in pushList"
          :key="index"
          class="ma-1"
        >
          <v-avatar
            left
            class="grey darken-4"
          >
            {{index + 1}}
          </v-avatar>
            {{word}}
        </v-chip>
      </td></tr></table>
    </v-container>
  </div>
</template>

<script>
export default {
  template: '<table-module>',
  data() {
    return {
      words:[
        {name: 'sou',       jp: 'そう',     position: 3, alpha: ['sou']},
        {name: 'saisho',    jp: '最初',     position: 2, alpha: ['saisyo', 'saisho']},
        {name: 'hyoji',     jp: '表示',     position: 6, alpha: ['hyouji', 'hyoji']},
        {name: 'okey',      jp: 'オーケー', position: 2, alpha: ['o-ke-', 'okey']},
        {name: 'iu',        jp: '言う',     position: 6, alpha: ['iu']},
        {name: 'nanimonai', jp: '何もない', position: 3, alpha: ['nanimonai']},
        {name: 'kuhaku',    jp: '(空白)',   position: 5, alpha: ['kuhaku', 'kuuhaku', 'kara']},
        {name: 'kara',      jp: 'から',     position: 4, alpha: ['kara']},
        {name: 'iya',       jp: 'いや',     position: 6, alpha: ['iya']},
        {name: 'kai1',      jp: '解',       position: 3, alpha: ['kai', 'toku']},
        {name: 'kai2',      jp: '回',       position: 6, alpha: ['kai', 'mawaru']},
        {name: 'kai3',      jp: '下位',     position: 4, alpha: ['kai', 'sitakurai']},
        {name: 'kai4',      jp: '快',       position: 4, alpha: ['kai', 'kokoroyoi']},
        {name: 'kai5',      jp: '開',       position: 5, alpha: ['kai', 'hiraku']},
        {name: 'ato',       jp: 'あと',     position: 5, alpha: ['ato']},
        {name: 'matte',     jp: 'まって',   position: 6, alpha: ['matte']},
        {name: 'dou1',      jp: 'どう？',   position: 4, alpha: ['dou', 'douhatena']},
        {name: 'dou2',      jp: '導',       position: 6, alpha: ['dou', 'mitibiku', 'michibiku']},
        {name: 'dou3',      jp: '同',       position: 4, alpha: ['dou', 'onaji']},
        {name: 'dou4',      jp: '動',       position: 4, alpha: ['dou', 'ugoku']},
        {name: 'dou5',      jp: 'どう',     position: 1, alpha: ['dou']},
        {name: 'taisho1',   jp: '大正',     position: 6, alpha: ['taisyou', 'taishou', 'tadasii']},
        {name: 'taisho2',   jp: '対照',     position: 5, alpha: ['taisyou', 'taishou', 'terasu']},
        {name: 'taisho3',   jp: '対称',     position: 4, alpha: ['taisyou', 'taishou', 'sayuu']},
        {name: 'taisho4',   jp: '大賞',     position: 3, alpha: ['taisyou', 'taishou', 'ookii']},
        {name: 'sai1',      jp: '才',       position: 6, alpha: ['sai', 'sainou']},
        {name: 'sai2',      jp: '再',       position: 2, alpha: ['sai', 'hutatabi', 'futatabi']},
        {name: 'sai3',      jp: '最',       position: 6, alpha: ['sai', 'mottomo']},
        {name: 'junbiok',   jp: '準備OK',   position: 0, alpha: ['junbiok', 'zyunbiok']},
        {name: 'chigau',    jp: '違う',     position: 0, alpha: ['tigau', 'chigau']},
        {name: 'blank',     jp: 'ブランク', position: 0, alpha: ['blank', 'buranku']},
        {name: 'nasi',      jp: 'なし',     position: 0, alpha: ['nasi']},
        {name: 'nani',      jp: '何？',     position: 0, alpha: ['nani']},
        {name: 'e-to',      jp: 'えーと',   position: 0, alpha: ['e-to', 'eto']},
        {name: 'nokori',    jp: '残り',     position: 0, alpha: ['nokori']},
        {name: 'migi',      jp: '右',       position: 0, alpha: ['migi']},
        {name: 'mannaka',   jp: '真ん中',   position: 0, alpha: ['mannaka', 'mannnaka']},
        {name: 'wait',      jp: 'ウェイト', position: 0, alpha: ['weito', 'wait']},
        {name: 'osite',     jp: '押して',   position: 0, alpha: ['osite', 'oshite']},
        {name: 'hidari',    jp: '左',       position: 0, alpha: ['hidari']},
        {name: 'sore',      jp: 'それ',     position: 0, alpha: ['sore']},
        {name: 'unun',      jp: 'うんうん', position: 0, alpha: ['unun', 'unnunn']},
        {name: 'sousou',    jp: 'そうそう', position: 0, alpha: ['sousou', 'soso']},
        {name: 'e',         jp: 'え？',     position: 0, alpha: ['e', 'ehatena']},
        {name: 'dekita',    jp: 'できた',   position: 0, alpha: ['dekita']},
        {name: 'tsugi',     jp: '次',       position: 0, alpha: ['tugi', 'tsugi']},
        {name: 'mochiron',  jp: 'もちろん', position: 0, alpha: ['mochiron', 'motiron']},
        {name: 'tatoeba',   jp: '例えば',   position: 0, alpha: ['tatoeba']},
      ],
      pushLists: [
        {name: 'junbiok',  list: ['そう', 'オーケー', '何？', '真ん中', '残り', '押して', '右', 'ブランク', '準備OK', '違う', '最初', 'えーと', 'なし', 'ウェイト']},
        {name: 'saisho',   list: ['残り', 'オーケー', 'そう', '真ん中', '違う', '右', 'なし', 'えーと', 'ウェイト', '準備OK', 'ブランク', '何？', '押して', '最初']},
        {name: 'chigau',   list: ['ブランク', 'えーと', 'ウェイト', '最初', '何？', '準備OK', '右', 'そう', 'なし', '残り', '押して', 'オーケー', '違う', '真ん中']},
        {name: 'blank',    list: ['ウェイト', '右', 'オーケー', '真ん中', 'ブランク', '押して', '準備OK', 'なし', '違う', '何？', '残り', 'えーと', 'そう', '最初']},
        {name: 'nasi',     list: ['えーと', '右', 'オーケー', '真ん中', 'そう', 'ブランク', '違う', '押して', '残り', '何？', 'ウェイト', '最初', 'なし', '準備OK']},
        {name: 'sou',      list: ['オーケー', '右', 'えーと', '真ん中', '最初', '何？', '押して', '準備OK', 'なし', 'そう', '残り', 'ブランク', '違う', 'ウェイト']},
        {name: 'nani',     list: ['えーと', '何？', '残り', 'なし', '準備OK', 'ブランク', '真ん中', '違う', 'オーケー', '最初', 'ウェイト', 'そう', '押して', '右']},
        {name: 'e-to',     list: ['準備OK', 'なし', '残り', '何？', 'オーケー', 'そう', '右', '違う', '押して', 'ブランク', 'えーと', '真ん中', 'ウェイト', '最初']},
        {name: 'nokori',   list: ['右', '残り', '最初', '違う', '真ん中', 'そう', 'ブランク', '何？', 'えーと', 'ウェイト', '押して', '準備OK', 'オーケー', 'なし']},
        {name: 'migi',     list: ['そう', 'なし', '準備OK', '押して', '違う', 'ウェイト', '何？', '右', '真ん中', '残り', 'えーと', 'ブランク', 'オーケー', '最初']},
        {name: 'mannaka',  list: ['ブランク', '準備OK', 'オーケー', '何？', 'なし', '押して', '違う', 'ウェイト', '残り', '真ん中', '右', '最初', 'えーと', 'そう']},
        {name: 'okey',     list: ['真ん中', '違う', '最初', 'そう', 'えーと', 'なし', 'ウェイト', 'オーケー', '残り', '準備OK', 'ブランク', '押して', '何？', '右']},
        {name: 'wait',     list: ['えーと', '違う', 'ブランク', 'オーケー', 'そう', '残り', '最初', '押して', '何？', 'ウェイト', 'なし', '準備OK', '右', '真ん中']},
        {name: 'oshite',   list: ['右', '真ん中', 'そう', '準備OK', '押して', 'オーケー', 'なし', 'えーと', 'ブランク', '残り', '最初', '何？', '違う', 'ウェイト']},
        {name: 'dou1',     list: ['もちろん', '導', '同', '動', '次', 'うんうん', '左', 'まって', 'え？', 'どう？', 'そうそう', '例えば', 'できた', 'それ']},
        {name: 'dou2',     list: ['同', '次', '例えば', 'うんうん', 'え？', 'できた', 'そうそう', 'まって', 'どう？', 'それ', '動', 'もちろん', '左', '導']},
        {name: 'dou3',     list: ['そうそう', '導', 'うんうん', '同', '次', '左', 'もちろん', 'それ', '動', 'どう？', 'え？', 'まって', '例えば', 'できた']},
        {name: 'dou4',     list: ['どう？', '動', '左', '次', 'そうそう', '導', 'それ', '同', 'え？', 'うんうん', 'もちろん', 'できた', '例えば', 'まって']},
        {name: 'hidari',   list: ['できた', 'それ', '左', 'うんうん', 'え？', 'もちろん', '同', 'まって', '動', '例えば', '次', 'そうそう', '導', 'どう？']},
        {name: 'sore',     list: ['うんうん', 'もちろん', '次', 'え？', '動', '左', 'そうそう', 'できた', 'それ', 'どう？', '例えば', 'まって', '導', '同']},
        {name: 'unun',     list: ['うんうん', '同', '導', 'どう？', 'できた', 'まって', 'そうそう', '次', 'もちろん', '例えば', '動', '左', 'それ', 'え？']},
        {name: 'sousou',   list: ['左', 'それ', '導', '動', '次', 'そうそう', 'できた', 'どう？', 'うんうん', '例えば', '同', 'もちろん', 'まって', 'え？']},
        {name: 'e',        list: ['どう？', 'まって', '動', '同', 'それ', 'できた', 'そうそう', '例えば', '導', 'うんうん', '左', '次', 'え？', 'もちろん']},
        {name: 'dekita',   list: ['もちろん', 'うんうん', '次', 'え？', '同', '左', '動', 'まって', '例えば', 'どう？', 'それ', '導', 'そうそう', 'できた']},
        {name: 'tsugi',    list: ['え？', 'うんうん', 'そうそう', '同', 'まって', 'もちろん', '次', '例えば', 'できた', '導', '左', '動', 'それ', 'どう？']},
        {name: 'matte',    list: ['導', 'それ', 'できた', 'そうそう', 'どう？', '左', 'もちろん', 'え？', '動', '次', 'まって', 'うんうん', '同', '例えば']},
        {name: 'mochiron', list: ['導', 'できた', '例えば', '動', 'どう？', 'まって', 'うんうん', '左', 'もちろん', 'それ', 'え？', '次', '同', 'そうそう']},
        {name: 'tatoeba',  list: ['動', '次', 'それ', '左', 'まって', 'できた', 'そうそう', 'え？', 'うんうん', 'どう？', '例えば', 'もちろん', '導', '同']},
      ],
      select: '',
    }
  },
  computed: {
    position() {
      let hits = this.words.filter(w => w.jp == this.select)
      if (hits.length == 0) {
        return false
      }
      switch (hits[0].position) {
        case 1:
          return '左上'
        case 2:
          return '右上'
        case 3:
          return '左真ん中'
        case 4:
          return '右真ん中'
        case 5:
          return '左下'
        case 6:
          return '左上'
        default:
          return false
      }
    },
    pushList() {
      let hits = this.words.filter(w => w.jp == this.select)
      if (hits.length == 0) {
        return false
      }
      let words = this.pushLists.filter(p => p.name == hits[0].name)
      if (words.length == 0) {
        return false
      }
      return words[0].list
    }
  },
  methods: {
    filter(item, queryText, itemText) {
      const wordList = item.alpha.map(w => w.toLowerCase())
      const searchText = queryText.toLowerCase()
      return wordList.some(w => w.indexOf(searchText) > -1)
    },
  },
}
</script>
