<template>
  <div class="cell-container" @keydown.stop.enter>
    <div v-if="!isForm" class="d-flex ma-1">
      <v-spacer />
      <v-btn outlined x-small class="mr-1" @click="$emit('cancel')">
        Cancel
      </v-btn>
      <v-btn x-small color="primary" @click="save">
        Save
      </v-btn>
    </div>
    <monaco-json-object-editor
      v-model="localState"
      class="text-left caption"
      style="width: 300px;min-height: 200px;min-width:100%"
    />
  </div>
</template>

<script>
import MonacoJsonObjectEditor from '@/components/monaco/MonacoJsonObjectEditor'

export default {
  name: 'JsonEditableCell',
  components: { MonacoJsonObjectEditor },
  props: {
    value: String,
    isForm: Boolean
  },
  data: () => ({
    localState: ''
  }),
  computed: {

    parentListeners() {
      const $listeners = {}

      if (this.$listeners.blur) {
        $listeners.blur = this.$listeners.blur
      }
      if (this.$listeners.focus) {
        $listeners.focus = this.$listeners.focus
      }

      return $listeners
    }
  },
  watch: {
    value(val) {
      try {
        this.localState = typeof val === 'string' ? JSON.parse(val) : val
      } catch (e) {
        // ignore parse error for invalid JSON
      }
    },
    localState(val) {
      if (this.isForm) {
        this.$emit('input', JSON.stringify(val))
      }
    }
  },
  created() {
    try {
      this.localState = typeof this.value === 'string' ? JSON.parse(this.value) : this.value
    } catch (e) {
      // ignore parse error for invalid JSON
    }
  },
  mounted() {
  },
  methods: {
    save() {
      this.$emit('input', JSON.stringify(this.localState))
    }
  }
}
</script>

<style scoped>
.cell-container {
  /*margin: 0 -5px;*/
  /*position: relative;*/
  width: 100%
}
</style>
<!--
/**
 * @copyright Copyright (c) 2021, Xgene Cloud Ltd
 *
 * @author Naveen MR <oof1lab@gmail.com>
 * @author Pranav C Balan <pranavxc@gmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
-->
