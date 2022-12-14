# this program reads the given results file (merged) and creates the charts for the given
# data

import sys
import os
import matplotlib.pyplot as plt
import csv

# check if arguments are given (we should have 2). if not, give usage
if len(sys.argv) != 2:
    print("Usage: python make_charts_edit.py <results_file>")
    sys.exit(1)


RESULTS_FILE = sys.argv[1]
OUTPUT_DIR = "./charts/"

# check if output directory exists, if not, create it
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)


def make_bar_graph(filepath):
    with open(filepath, 'r') as f:
        reader = csv.reader(f, delimiter=',')
        # skip header
        next(reader)
        # dict of [config] -> [(amount of times it succeeded, qualities)]
        results = {}
        file_set = set()
        for row in reader:
            file, model, lang, strategy, retries, num_comp, temp,  iters, successes, avg_quality = row
            file_set.add(file)
            key = (model, lang, strategy, retries, num_comp, temp, iters)
            if key not in results:
                if successes != "0":
                    results[key] = (1, [float(avg_quality)])
                else:
                    results[key] = (0, [])
            elif successes != "0":
                results[key] = (results[key][0] + 1,
                                results[key][1] + [float(avg_quality)])

        max_y = len(file_set)
        # average out quals, round to 2 decimals
        for key in results:
            if len(results[key][1]) > 0:
                results[key] = (results[key][0], round(
                    sum(results[key][1]) / len(results[key][1]), 2))
            else:
                results[key] = (results[key][0], 0)

        # create bar graph
        # x axis: config
        # y axis: amount of times it succeeded
        x = []
        y = []
        keys_map = {}
        labels = []
        for key, value in results.items():
            if key[5] == '1':
                continue
            ket_str_pre = "{}-{}".format(key[0], key[2])
            if ket_str_pre not in keys_map:
                keys_map[ket_str_pre] = 0
            else:
                keys_map[ket_str_pre] += 1

            ket_str = "{}-{}-{}".format(key[0], key[2], keys_map[ket_str_pre])
            x.append(ket_str)
            y.append(value[0])
            labels.append(
                "Successes\n{}\nAvg Quality\n{}".format(value[0], value[1]))

        # create plot
        fig, ax = plt.subplots()
        ax.bar(x, y)
        ax.set_title("Successes per configuration")
        ax.set_xlabel("Config")
        ax.set_ylabel("Successes")
        # make y axis got up to max_y
        ax.set_ylim(0, max_y)

        # add labels
        for rect, label in zip(ax.patches, labels):
            height = rect.get_height()
            # get the height of the label
            ax.text(rect.get_x() + rect.get_width() / 2, height - (max_y / 5.5), label,
                    ha='center', va='bottom')

        fig.tight_layout()
        plt.savefig(OUTPUT_DIR + "successes_per_config.png")
        plt.close()


make_bar_graph(RESULTS_FILE)
