<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="168"
    height="168"
    viewBox="0 0 168 168"
  >
    <defs>
      <symbol id="dot" viewBox="0 0 20 20">
        <circle
          cx="10" cy="10" r="1"
          fill="white"
        />
      </symbol>
      <symbol id="circle" viewBox="0 0 20 20">
        <circle
          cx="10" cy="10" r="6"
          fill="none"
          stroke="white" stroke-width="1"
        />
      </symbol>
      <symbol id="start" viewBox="0 0 20 20">
        <circle
          cx="10" cy="10" r="4"
          fill="white"
        />
      </symbol>
      <symbol id="goal" viewBox="0 0 20 20">
        <polygon
          points="10,4 16,16 4,16"
          fill="red"
        />
      </symbol>
    </defs>

    <g transform="scale(1.2)">

      <rect x="20" y="20" width="120" height="120" fill="none" stroke="white" stroke-width="1" />

      <text x="0" y="35" class="number">1</text>
      <text x="0" y="55" class="number">2</text>
      <text x="0" y="75" class="number">3</text>
      <text x="0" y="95" class="number">4</text>
      <text x="0" y="115" class="number">5</text>
      <text x="0" y="135" class="number">6</text>

      <text x="30" y="15" class="alpha">A</text>
      <text x="50" y="15" class="alpha">B</text>
      <text x="70" y="15" class="alpha">C</text>
      <text x="90" y="15" class="alpha">D</text>
      <text x="110" y="15" class="alpha">E</text>
      <text x="130" y="15" class="alpha">F</text>

      <use
        v-for="n in 36"
        :key="'dot' + n"
        xlink:href="#dot"
        :x="(n - 1) % 6 * 20 + 20" :y="Math.floor((n - 1) / 6) * 20 + 20"
        width="20" height="20"
      />

      <use
        v-for="(circle, index) in circles"
        :key="'circle' + index"
        xlink:href="#circle"
        :x="20 * circle.col + 20" :y="20 * circle.row + 20"
        width="20" height="20"
      />
      <use
        v-if="start"
        xlink:href="#start"
        :x="20 * start.col + 20" :y="20 * start.row + 20"
        width="20" height="20"
      />
      <use
        v-if="goal"
        xlink:href="#goal"
        :x="20 * goal.col + 20" :y="20 * goal.row + 20"
        width="20" height="20"
      />

      <use
        v-if="hoverIcon"
        :xlink:href="hoverIcon.href"
        :x="20 * hoverIcon.col + 20" :y="20 * hoverIcon.row + 20"
        width="20" height="20"
        opacity="0.5"
      />

      <path
        v-for="(cell, index) in rightWalls"
        :key="'right-wall' + index"
        :d="'M' + (20 * cell.col + 40) + ' ' + (20 * cell.row + 20) + 'v20'"
        stroke="white"
      />
      <path
        v-for="(cell, index) in belowWalls"
        :key="'below-wall' + index"
        :d="'M' + (20 * cell.col + 20) + ' ' + (20 * cell.row + 40) + 'h20'"
        stroke="white"
      />

      <rect
        v-for="n in 36"
        :key="'if' + n"
        @click="emitClickedCell({row: Math.floor((n - 1) / 6), col: (n - 1) % 6})"
        @mouseover="setHover({row: Math.floor((n - 1) / 6), col: (n - 1) % 6})"
        @mouseleave="deleteHover({row: Math.floor((n - 1) / 6), col: (n - 1) % 6})"
        :x="(n - 1) % 6 * 20 + 20" :y="Math.floor((n - 1) / 6) * 20 + 20"
        width="20" height="20"
        fill="ffffff"
        opacity="0"
      />

    </g>

  </svg>
</template>

<script>
import { mazes } from '~/middleware/data/mazes'

export default {
  template: '<maze-image>',
  props: [
    'circle',
    'start',
    'goal',
    'hover',
  ],
  data() {
    return {
      hoverIcon: false,
    }
  },
  watch: {
    circle() {
      this.emitAnswer()
    },
    start() {
      this.emitAnswer()
    },
    goal() {
      this.emitAnswer()
    },
  },
  computed: {
    mazeData() {
      if (!this.circle) {
        return false
      }
      let maze = mazes.filter(m => m.circles.some(c => c.row == this.circle.row && c.col == this.circle.col))
      if (maze.length > 0) {
        return maze[0]
      }
      this.$emit('error', {type: 'circle'})
      return false
    },
    circles() {
      if (!this.mazeData) {
        return false
      }
      return this.mazeData.circles
    },
    rightWalls() {
      if (!this.mazeData) {
        return false
      }
      let walls = []
      this.mazeData.points.forEach((row, ri) => {
        row.forEach((col, ci) => {
          if (!col.right) {
            walls.push({row: ri, col: ci})
          }
        })
      })
      return walls
    },
    belowWalls() {
      if (!this.mazeData) {
        return false
      }
      let walls = []
      this.mazeData.points.forEach((row, ri) => {
        row.forEach((col, ci) => {
          if (!col.below) {
            walls.push({row: ri, col: ci})
          }
        })
      })
      return walls
    },
  },
  methods: {
    emitClickedCell(cell) {
      this.$emit('click', cell)
    },
    setHover(cell) {
      if (!this.hover) {
        return
      }
      this.hoverIcon = {
        href: '#' + this.hover,
        row: cell.row,
        col: cell.col,
      }
    },
    deleteHover(cell) {
      if (!this.hoverIcon) {
        return
      }
      if (cell.row == this.hoverIcon.row && cell.col == this.hoverIcon.col) {
        this.hoverIcon = false
      }
    },
    emitAnswer() {
      if (this.circle && this.start && this.goal && this.mazeData) {
        this.$emit('answer', this.route(this.start))
      }
    },
    route(cell, prevCell=null) {
      if (cell.row == this.goal.row && cell.col == this.goal.col) {
        return []
      }
      let target = this.aboveCell(cell)
      if (target && (!prevCell || (target.row != prevCell.row || target.col != prevCell.col))) {
        let ans = this.route(target, cell)
        if (ans) {
          ans.unshift('up')
          return ans
        }
      }
      target = this.belowCell(cell)
      if (target && (!prevCell || (target.row != prevCell.row || target.col != prevCell.col))) {
        let ans = this.route(target, cell)
        if (ans) {
          ans.unshift('down')
          return ans
        }
      }
      target = this.leftCell(cell)
      if (target && (!prevCell || (target.row != prevCell.row || target.col != prevCell.col))) {
        let ans = this.route(target, cell)
        if (ans) {
          ans.unshift('left')
          return ans
        }
      }
      target = this.rightCell(cell)
      if (target && (!prevCell || (target.row != prevCell.row || target.col != prevCell.col))) {
        let ans = this.route(target, cell)
        if (ans) {
          ans.unshift('right')
          return ans
        }
      }
      return false
    },
    aboveCell(cell) {
      if (cell.row <= 0) {
        return false
      }
      if (this.mazeData.points[cell.row - 1][cell.col].below) {
        return {...cell, row: cell.row - 1}
      }
    },
    belowCell(cell) {
      if (cell.row >= 5) {
        return false
      }
      if (this.mazeData.points[cell.row][cell.col].below) {
        return {...cell, row: cell.row + 1}
      }
      return false
    },
    leftCell(cell) {
      if (cell.col <= 0) {
        return false
      }
      if (this.mazeData.points[cell.row][cell.col - 1].right) {
        return {...cell, col: cell.col - 1}
      }
      return false
    },
    rightCell(cell) {
      if (cell.col >= 5) {
        return false
      }
      if (this.mazeData.points[cell.row][cell.col].right) {
        return {...cell, col: cell.col + 1}
      }
      return false
    },
  },
}
</script>

<style scoped>
  .number {
    font-family: 'Courier New', Courier, monospace;
    font-size: 20px;
    stroke: none;
    fill: white;
  }
  .alpha {
    font-family: 'Courier New', Courier, monospace;
    font-size: 20px;
    text-anchor: middle;
    stroke: none;
    fill: white;
  }
</style>
